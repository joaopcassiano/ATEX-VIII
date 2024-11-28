using Dapper;
using MaisApoio.MaisApoio.Controllers.Models.Necessidade.Respostas;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class NecessidadeRepositorio
    {
        private MaisApoioContexto _banco;

        public NecessidadeRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        public async Task<int> CriarAsync(Necessidade necessidade)
        {

            string sql = @"
            INSERT INTO Necessidade (Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo) 
            OUTPUT INSERTED.Id AS ID
            VALUES (@Descricao, @DataRegistro, @Prioridade, @BeneficiarioID, @VoluntarioID, @Ativo);";


            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var id = await conexao.QueryFirstAsync<int>(sql, new
            {
                Descricao = necessidade.Descricao,
                DataRegistro = necessidade.DataRegistro,
                Prioridade = necessidade.Prioridade,
                BeneficiarioID = necessidade.BeneficiarioID,
                VoluntarioID = necessidade.VoluntarioID,
                Ativo = necessidade.Ativo

            });

            await conexao.CloseAsync();

            return id;

        }

        public async Task<List<NecessidadeBeneficiario>> ObterPorBeneficiarioAsync(int id)
        {
            string sql = "SELECT VoluntarioID AS ID, * FROM Voluntario WHERE BeneficiarioID = @id AND Ativo = 1";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var voluntario = (await conexao.QueryAsync<NecessidadeBeneficiario>(sql, new { id = id })).ToList();

            conexao.Close();

            return voluntario;
        }

        public async Task<List<NecessidadeVoluntario>> ObterPorVoluntarioAsync(int id)
        {
            string sql = @"
            SELECT 
            n.NecessidadeID,
            n.Descricao,
            n.Prioridade,
            n.DataRegistro,
            n.BeneficiarioID,
            n.VoluntarioID,
            b.Nome,
            b.Email,
            b.Telefone,
            b.DataNascimento,
            b.ImagemPerfil,
            b.CPF,
            b.Necessidade,
            b.AreaAtuacao,
            n.Ativo
            FROM Doacao d
            INNER JOIN Beneficiario b ON v.BeneficiarioID = b.BeneficiarioID
            WHERE VoluntarioID = @id AND v.Ativo = 1";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var doacao = (await conexao.QueryAsync<NecessidadeVoluntario>(sql, new { id = id })).ToList();

            conexao.Close();

            return doacao;
        }
    }
}
