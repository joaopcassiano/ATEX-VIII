using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EnderecoBeneficiarioRepositorio
{
    private MaisApoioContexto _banco;

    public EnderecoBeneficiarioRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task<int> CriarAsync(EnderecoBeneficiario enderecoBeneficiario)
    {
        string sql = @"
            INSERT INTO EnderecoBeneficiario (Rua, Bairro, Numero, Complemento, BeneficiarioID, Cidade, Estado, Cep, Ativo)
            OUTPUT INSERTED.EnderecoID as ID
            VALUES (@Rua, @Bairro, @Numero, @Complemento, @BeneficiarioID, @Cidade, @Estado, @Cep, @Ativo)
        ";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var id = await conexao.QueryFirstOrDefaultAsync<int>(sql, new
        {
            Rua = enderecoBeneficiario.Rua,
            Bairro = enderecoBeneficiario.Bairro,
            Numero = enderecoBeneficiario.Numero,
            Complemento = enderecoBeneficiario.Complemento,
            BeneficiarioID = enderecoBeneficiario.BeneficiarioID,
            Cidade = enderecoBeneficiario.Cidade,
            Estado = enderecoBeneficiario.Estado,
            Cep = enderecoBeneficiario.Cep,
            Ativo = enderecoBeneficiario.Ativo
        });

        conexao.Close();

        return id;

    }

    public async Task<EnderecoBeneficiario> ObterEnderecoAsync(int id)
    {
        string sql = @"SELECT EnderecoBeneficiarioID AS ID, *
        FROM EnderecoBeneficiario WHERE EnderecoBeneficiarioID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoBeneficiario>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task<EnderecoBeneficiario> ObterEnderecoPorBeneficiarioAsync(int id)
    {
        string sql = @"SELECT EnderecoBeneficiarioID AS ID, *
        FROM EnderecoBeneficiario WHERE BeneficiarioID = @ID";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var endereco = await conexao.QuerySingleAsync<EnderecoBeneficiario>(sql, new { ID = id });

        conexao.Close();

        return endereco;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        string sql = "DELETE FROM EnderecoBeneficiario WHERE EnderecoBeneficiarioID = @id";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new { id = id });
        conexao.Close();
    }
}