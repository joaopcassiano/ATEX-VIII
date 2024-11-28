using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class EnderecoVoluntarioRepositorio
    {
        private MaisApoioContexto _banco;

        public EnderecoVoluntarioRepositorio()
        {
            _banco = new MaisApoioContexto();
        }


        public async Task<int> CriarAsync(EnderecoVoluntario enderecoVoluntario)
        {
            string sql = @"
            INSERT INTO EnderecoVoluntario (Rua, Bairro, Numero, Complemento, VoluntarioID, Cidade, Estado, Cep, Ativo)
            OUTPUT INSERTED.EnderecoID as ID
            VALUES (@Rua, @Bairro, @Numero, @Complemento, @VoluntarioID, @Cidade, @Estado, @Cep, @Ativo)
        ";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var id = await conexao.QueryFirstOrDefaultAsync<int>(sql, new
            {
                Rua = enderecoVoluntario.Rua,
                Bairro = enderecoVoluntario.Bairro,
                Numero = enderecoVoluntario.Numero,
                Complemento = enderecoVoluntario.Complemento,
                voluntarioID = enderecoVoluntario.VoluntarioID,
                Cidade = enderecoVoluntario.Cidade,
                Estado = enderecoVoluntario.Estado,
                Cep = enderecoVoluntario.Cep,
                Ativo = enderecoVoluntario.Ativo
            });

            conexao.Close();

            return id;

        }

        public async Task<EnderecoVoluntario> ObterEnderecoAsync(int id)
        {
            string sql = @"SELECT EnderecoID AS ID, *
        FROM EnderecoVoluntario WHERE EnderecoVoluntarioID = @ID";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var endereco = await conexao.QuerySingleAsync<EnderecoVoluntario>(sql, new { ID = id });

            conexao.Close();

            return endereco;
        }

        public async Task<EnderecoVoluntario> ObterEnderecoPorVoluntarioAsync(int id)
        {
            string sql = @"SELECT EnderecoID AS ID, *
        FROM EnderecoVoluntario WHERE VoluntarioID = @ID";

            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var endereco = await conexao.QuerySingleAsync<EnderecoVoluntario>(sql, new { ID = id });

            conexao.Close();

            return endereco;
        }

        public async Task ExclusaoFisicaAsync(int id)
        {
            string sql = "DELETE FROM EnderecoVoluntario WHERE EnderecoID = @id";
            var conexao = _banco.ConectarSqlServer();
            conexao.Open();
            await conexao.ExecuteAsync(sql, new { id = id });
            conexao.Close();
        }
    }
}
