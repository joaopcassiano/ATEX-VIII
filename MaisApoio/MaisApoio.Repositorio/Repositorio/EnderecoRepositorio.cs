using System.Collections;
using System.Data.SqlTypes;
using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EnderecoRepositorio
{
    private MaisApoioContexto _banco;

    public EnderecoRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task<int> CriarAsync(Endereco endereco)
    {
        string sql = @"
            INSERT INTO Endereco (Rua, Bairro, Numero, Complemento, Cidade, Estado, Cep, Ativo)
            OUTPUT INSERTED.BeneficiarioID as ID
            VALUES (@Rua, @Bairro, @Numero, @Complemento, @Cidade, @Estado, @Cep, @Ativo)
        ";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var id = await conexao.QuerySingleAsync<int>(sql, new { Rua = endereco.Rua, Bairro = endereco.Bairro, Numero = endereco.Numero, Complemento = endereco.Complemento, Cidade = endereco.Cidade, Estado = endereco.Estado, Cep = endereco.Cep, Ativo = endereco.Ativo });

        conexao.Close();

        return id;
    }

    public async Task<Endereco> ObterEnderecoAsync(int id)
    {
        string sql = "SELECT * FROM Endereco WHERE EnderecoID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<Endereco>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

}