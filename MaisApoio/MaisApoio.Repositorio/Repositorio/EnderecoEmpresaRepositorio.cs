using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EnderecoEmpresaRepositorio
{
    private MaisApoioContexto _banco;

    public EnderecoEmpresaRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task<int> CriarAsync(EnderecoEmpresa enderecoEmpresa)
    {
        string sql = @"
            INSERT INTO EnderecoEmpresa (Rua, Bairro, Numero, Complemento, EmpresaID, Cidade, Estado, Cep, Ativo)
            OUTPUT INSERTED.EnderecoID as ID
            VALUES (@Rua, @Bairro, @Numero, @Complemento, @EmpresaID, @Cidade, @Estado, @Cep, @Ativo)
        ";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var id = await conexao.QueryFirstOrDefaultAsync<int>(sql, new
        {
            Rua = enderecoEmpresa.Rua,
            Bairro = enderecoEmpresa.Bairro,
            Numero = enderecoEmpresa.Numero,
            Complemento = enderecoEmpresa.Complemento,
            EmpresaID = enderecoEmpresa.EmpresaID,
            Cidade = enderecoEmpresa.Cidade,
            Estado = enderecoEmpresa.Estado,
            Cep = enderecoEmpresa.Cep,
            Ativo = enderecoEmpresa.Ativo
        });

        conexao.Close();

        return id;

    }

    public async Task<EnderecoEmpresa> ObterEnderecoAsync(int id)
    {
        string sql = @"SELECT EnderecoEmpresaID AS ID, *
        FROM EnderecoEmpresa WHERE EnderecoEmpresaID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoEmpresa>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task<EnderecoEmpresa> ObterEnderecoPorEmpresaAsync(int id)
    {
        string sql = @"SELECT EnderecoEmpresaID AS ID, *
        FROM EnderecoEmpresa WHERE EmpresaID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoEmpresa>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        string sql = "DELETE FROM EnderecoEmpresa WHERE EnderecoEmpresaID = @id";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new { id = id });
        conexao.Close();
    }

    public async Task AtualizarAsync(EnderecoEmpresa enderecoEmpresa, int ID)
    {
        string sql = @"
            UPDATE EnderecoEmpresa
            SET Rua = @Rua, Bairro = @Bairro, Numero = @Numero, Complemento = @Complemento, Cidade = @Cidade, Estado = @Estado, Cep = @Cep, Ativo = @Ativo
            WHERE EmpresaID = @ID
        ";

        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new
        {
            Rua = enderecoEmpresa.Rua,
            Bairro = enderecoEmpresa.Bairro,
            Numero = enderecoEmpresa.Numero,
            Complemento = enderecoEmpresa.Complemento,
            Cidade = enderecoEmpresa.Cidade,
            Estado = enderecoEmpresa.Estado,
            Cep = enderecoEmpresa.Cep,
            Ativo = enderecoEmpresa.Ativo,
            ID = ID
        });

        conexao.Close();
    }

}