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
            OUTPUT INSERTED.NecessidadeID AS ID
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

        public async Task<List<Necessidade>> ObterPorBeneficiarioAsync(int id)
        {
            string sql = "SELECT NecessidadeID AS ID, * FROM Necessidade WHERE BeneficiarioID = @id AND Ativo = 1";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var voluntario = (await conexao.QueryAsync<Necessidade>(sql, new { id = id })).ToList();

            conexao.Close();

            return voluntario;
        }

        public async Task<List<NecessidadeVoluntario>> ObterPorVoluntarioAsync(int id)
        {
            string sql = @"
            SELECT 
            d.NecessidadeID,
            d.Descricao,
            d.Prioridade,
            d.DataRegistro,
            d.BeneficiarioID,
            d.VoluntarioID,
            b.Nome,
            b.Email,
            b.Telefone,
            b.DataNascimento,
            b.ImagemPerfil,
            b.CPF,
            b.Necessidade,
            d.Ativo
            FROM Necessidade d
            INNER JOIN Beneficiario b ON b.BeneficiarioID = d.BeneficiarioID
            WHERE d.VoluntarioID = @id AND d.Ativo = 1";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var doacao = (await conexao.QueryAsync<NecessidadeVoluntario>(sql, new { id = id })).ToList();

            conexao.Close();

            return doacao;
        }
    }
}
