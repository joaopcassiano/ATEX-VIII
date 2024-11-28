using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EnderecoDoadorRepositorio
{
    private MaisApoioContexto _banco;

    public EnderecoDoadorRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task<int> CriarAsync(EnderecoDoador enderecoDoador)
    {
        string sql = @"
            INSERT INTO EnderecoDoador (Rua, Bairro, Numero, Complemento, DoadorID, Cidade, Estado, Cep, Ativo)
            OUTPUT INSERTED.EnderecoID as ID
            VALUES (@Rua, @Bairro, @Numero, @Complemento, @DoadorID, @Cidade, @Estado, @Cep, @Ativo)
        ";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var id = await conexao.QueryFirstOrDefaultAsync<int>(sql, new
        {
            Rua = enderecoDoador.Rua,
            Bairro = enderecoDoador.Bairro,
            Numero = enderecoDoador.Numero,
            Complemento = enderecoDoador.Complemento,
            DoadorID = enderecoDoador.DoadorID,
            Cidade = enderecoDoador.Cidade,
            Estado = enderecoDoador.Estado,
            Cep = enderecoDoador.Cep,
            Ativo = enderecoDoador.Ativo
        });

        conexao.Close();

        return id;

    }

    public async Task<EnderecoDoador> ObterEnderecoAsync(int id)
    {
        string sql = @"SELECT EnderecoID AS ID, *
        FROM EnderecoDoador WHERE EnderecoID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoDoador>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task<EnderecoDoador> ObterEnderecoPorDoadorAsync(int id)
    {
        string sql = @"SELECT EnderecoID AS ID, *
        FROM EnderecoDoador WHERE DoadorID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoDoador>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        string sql = "DELETE FROM EnderecoDoador WHERE EnderecoID = @id";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new { id = id });
        conexao.Close();
    }

    public async Task AtualizarAsync(EnderecoDoador enderecoDoador, int ID)
    {
        string sql = @"
            UPDATE EnderecoDoador
            SET Rua = @Rua, Bairro = @Bairro, Numero = @Numero, Complemento = @Complemento, Cidade = @Cidade, Estado = @Estado, Cep = @Cep, Ativo = @Ativo
            WHERE DoadorID = @ID
        ";

        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new{
            Rua = enderecoDoador.Rua,
            Bairro = enderecoDoador.Bairro,
            Numero = enderecoDoador.Numero,
            Complemento = enderecoDoador.Complemento,
            Cidade = enderecoDoador.Cidade,
            Estado = enderecoDoador.Estado,
            Cep = enderecoDoador.Cep,
            Ativo = enderecoDoador.Ativo,
            ID = ID
        });

        conexao.Close();
    }
}