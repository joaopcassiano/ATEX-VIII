using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EnderecoBoadorRepositorio
{
    private MaisApoioContexto _banco;

    public EnderecoBoadorRepositorio()
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
            BeneficiarioID = enderecoDoador.DoadorID,
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
        string sql = @"SELECT EnderecoDoadorID AS ID, *
        FROM EnderecoDoador WHERE EnderecoDoadorID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoDoador>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task<EnderecoDoador> ObterEnderecoPorDoadorAsync(int id)
    {
        string sql = @"SELECT EnderecoDoadorID AS ID, *
        FROM EnderecoDoador WHERE DoadorID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoDoador>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        string sql = "DELETE FROM EnderecoDoador WHERE EnderecoDoadorID = @id";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new { id = id });
        conexao.Close();
    }
}