using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class NecessidadeRepositorio
    {
        private MaisApoioContexto _banco;

        public NecessidadeRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        public async Task<List<Necessidade>> ObterTodosAsync()
        {
            string sql = "SELECT NecessidadeID AS ID, Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo FROM Necessidade";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var necessidades = await conexao.QueryAsync<Necessidade>(sql);

            await conexao.CloseAsync();

            return necessidades.ToList();
        }

        public async Task<int> CriarAsync(Necessidade necessidade)
        {
            string sql = @"INSERT INTO Necessidade (Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo)
                           OUTPUT INSERTED.NecessidadeID as ID
                           VALUES (@Descricao, @DataRegistro, @Prioridade, @BeneficiarioID, @VoluntarioID, @Ativo);";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var id = await conexao.QueryFirstAsync<int>(sql, new
            {
                necessidade.Descricao,
                necessidade.DataRegistro,
                necessidade.Prioridade,
                necessidade.BeneficiarioID,
                necessidade.VoluntarioID,
                necessidade.Ativo
            });

            await conexao.CloseAsync();

            return id;
        }

        public async Task AtualizarAsync(Necessidade necessidade)
        {
            string sql = @"UPDATE Necessidade 
                           SET Descricao = @Descricao, DataRegistro = @DataRegistro, Prioridade = @Prioridade, 
                               BeneficiarioID = @BeneficiarioID, VoluntarioID = @VoluntarioID, Ativo = @Ativo 
                           WHERE NecessidadeID = @NecessidadeID";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            await conexao.ExecuteAsync(sql, new
            {
                necessidade.NecessidadeID,
                necessidade.Descricao,
                necessidade.DataRegistro,
                necessidade.Prioridade,
                necessidade.BeneficiarioID,
                necessidade.VoluntarioID,
                necessidade.Ativo
            });

            await conexao.CloseAsync();
        }

        public async Task<Necessidade> ObterPorIdAsync(int id)
        {
            string sql = "SELECT NecessidadeID AS ID, Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo FROM Necessidade WHERE NecessidadeID = @id";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var necessidade = await conexao.QueryFirstOrDefaultAsync<Necessidade>(sql, new { id });

            await conexao.CloseAsync();

            return necessidade;
        }

        public async Task<List<Necessidade>> ObterPorPrioridadeAsync(string prioridade)
        {
            string sql = "SELECT NecessidadeID AS ID, Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo FROM Necessidade WHERE Prioridade = @prioridade";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var necessidades = await conexao.QueryAsync<Necessidade>(sql, new { prioridade });

            await conexao.CloseAsync();

            return necessidades.ToList();
        }

        public async Task<List<Necessidade>> ObterPorBeneficiarioIdAsync(int beneficiarioId)
        {
            string sql = "SELECT NecessidadeID AS ID, Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo FROM Necessidade WHERE BeneficiarioID = @beneficiarioId";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var necessidades = await conexao.QueryAsync<Necessidade>(sql, new { beneficiarioId });

            await conexao.CloseAsync();

            return necessidades.ToList();
        }

        public async Task<List<Necessidade>> ObterPorVoluntarioIdAsync(int voluntarioId)
        {
            string sql = "SELECT NecessidadeID AS ID, Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo FROM Necessidade WHERE VoluntarioID = @voluntarioId";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var necessidades = await conexao.QueryAsync<Necessidade>(sql, new { voluntarioId });

            await conexao.CloseAsync();

            return necessidades.ToList();
        }

        public async Task<List<Necessidade>> ObterPorAtivoAsync(bool ativo)
        {
            string sql = "SELECT NecessidadeID AS ID, Descricao, DataRegistro, Prioridade, BeneficiarioID, VoluntarioID, Ativo FROM Necessidade WHERE Ativo = @ativo";

            var conexao = _banco.ConectarSqlServer();

            await conexao.OpenAsync();

            var necessidades = await conexao.QueryAsync<Necessidade>(sql, new { ativo });

            await conexao.CloseAsync();

            return necessidades.ToList();
        }
    }
}
