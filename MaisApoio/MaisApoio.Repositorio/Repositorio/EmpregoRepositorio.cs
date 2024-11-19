using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class EmpregoRepositorio
    {
        private MaisApoioContexto _banco;

        public EmpregoRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        public async Task<List<Emprego>> ObterTodosAsync()
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var empregos = await conexao.QueryAsync<Emprego>(sql);

            await conexao.CloseAsync();

            return empregos.ToList();
        }

        public async Task<int> CriarAsync(Emprego emprego)
        {
            string sql = @"INSERT INTO Emprego (TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo)
                           OUTPUT INSERTED.EmpregoID as ID
                           VALUES (@TituloVaga, @Descricao, @Salario, @BeneficiarioID, @EnderecoID, @Ativo);";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var id = await conexao.QueryFirstAsync<int>(sql, new
            {
                emprego.TituloVaga,
                emprego.Descricao,
                emprego.Salario,
                emprego.BeneficiarioID,
                emprego.EnderecoID,
                emprego.Ativo
            });

            await conexao.CloseAsync();

            return id;
        }

        public async Task AtualizarAsync(Emprego emprego)
        {
            string sql = @"UPDATE Emprego 
                           SET TituloVaga = @TituloVaga, Descricao = @Descricao, Salario = @Salario, 
                               BeneficiarioID = @BeneficiarioID, EnderecoID = @EnderecoID, Ativo = @Ativo 
                           WHERE EmpregoID = @EmpregoID";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            await conexao.ExecuteAsync(sql, new
            {
                emprego.EmpregoID,
                emprego.TituloVaga,
                emprego.Descricao,
                emprego.Salario,
                emprego.BeneficiarioID,
                emprego.EnderecoID,
                emprego.Ativo
            });

            await conexao.CloseAsync();
        }

        public async Task<Emprego> ObterPorIdAsync(int id)
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego WHERE EmpregoID = @id";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var emprego = await conexao.QueryFirstOrDefaultAsync<Emprego>(sql, new { id });

            await conexao.CloseAsync();

            return emprego;
        }

        public async Task<List<Emprego>> ObterPorTituloVagaAsync(string tituloVaga)
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego WHERE TituloVaga = @tituloVaga";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var empregos = await conexao.QueryAsync<Emprego>(sql, new { tituloVaga });

            await conexao.CloseAsync();

            return empregos.ToList();
        }

        public async Task<List<Emprego>> ObterPorSalarioAsync(decimal salario)
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego WHERE Salario = @salario";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var empregos = await conexao.QueryAsync<Emprego>(sql, new { salario });

            await conexao.CloseAsync();

            return empregos.ToList();
        }

        public async Task<List<Emprego>> ObterPorBeneficiarioIdAsync(int beneficiarioId)
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego WHERE BeneficiarioID = @beneficiarioId";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var empregos = await conexao.QueryAsync<Emprego>(sql, new { beneficiarioId });

            await conexao.CloseAsync();

            return empregos.ToList();
        }

        public async Task<List<Emprego>> ObterPorEnderecoIdAsync(int enderecoId)
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego WHERE EnderecoID = @enderecoId";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var empregos = await conexao.QueryAsync<Emprego>(sql, new { enderecoId });

            await conexao.CloseAsync();

            return empregos.ToList();
        }

        public async Task<List<Emprego>> ObterPorAtivoAsync(bool ativo)
        {
            string sql = "SELECT EmpregoID AS ID, TituloVaga, Descricao, Salario, BeneficiarioID, EnderecoID, Ativo FROM Emprego WHERE Ativo = @ativo";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var empregos = await conexao.QueryAsync<Emprego>(sql, new { ativo });

            await conexao.CloseAsync();

            return empregos.ToList();
        }
    }
}
