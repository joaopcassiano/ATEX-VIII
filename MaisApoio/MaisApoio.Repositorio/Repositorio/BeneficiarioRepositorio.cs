using System.Collections;
using System.Data.SqlTypes;
using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class BeneficiarioRepositorio
{
    private MaisApoioContexto _banco;

    public BeneficiarioRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task<List<Beneficiario>> ObterTodos()
    {
        string sql = "SELECT * FROM Beneficiario";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiarios = await conexao.QueryAsync<Beneficiario>(sql);

        conexao.Close();

        return beneficiarios.ToList();
    }

    public async Task CarregarImagem(IFormFile file, int id)
    {
        var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        string sql = "Insert into Beneficiario(ImagemPerfil) values (@arquivo) WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = id, arquivo = ms.ToArray() });

        conexao.Close();
    }

    public async Task CriarBeneficiario(Beneficiario beneficiario)
    {

        string sql = "Insert into Beneficiario(nome,email,senha,dataNascimento,situacaoEconomica,ativo) values (@nome,@email,@senha,@dataNascimento,@situacaoEconomica,@ativo);";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = beneficiario.ID, nome = beneficiario.Nome, email = beneficiario.Email, senha = beneficiario.Senha, dataNascimento = beneficiario.DataNascimento, situacaoEconomica = beneficiario.SituacaoEconomica, ativo = beneficiario.Ativo });

        conexao.Close();

    }

}