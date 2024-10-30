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

    public async Task<List<Beneficiario>> ObterTodosAsync()
    {
        string sql = "SELECT * FROM Beneficiario";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiarios = await conexao.QueryAsync<Beneficiario>(sql);

        conexao.Close();

        return beneficiarios.ToList();
    }

    public async Task CarregarImagemAsync(IFormFile file, int id)
    {
        var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        string sql = "Insert into Beneficiario(ImagemPerfil) values (@arquivo) WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = id, arquivo = ms.ToArray() });

        conexao.Close();
    }

    public async Task CriarAsync(Beneficiario beneficiario)
    {

        string sql = "Insert into Beneficiario(nome,email,enderecoID,senha,dataNascimento,situacaoEconomica,ativo) values (@nome,@email,@enderecoID,@senha,@dataNascimento,@situacaoEconomica,@ativo);";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { nome = beneficiario.Nome, email = beneficiario.Email, enderecoID = beneficiario.EnderecoID, senha = beneficiario.Senha, dataNascimento = beneficiario.DataNascimento, situacaoEconomica = beneficiario.SituacaoEconomica, ativo = beneficiario.Ativo });

        conexao.Close();

    }

    public async Task AtualizarAsync(Beneficiario beneficiario)
    {
        string sql = "UPDATE Beneficiario SET nome = @nome, dataNascimento = @dataNascimento, situacaoEconomica = @situacaoEconomica, ativo = @ativo WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = beneficiario.ID, ativo = beneficiario.Ativo, nome = beneficiario.Nome, dataNascimento = beneficiario.DataNascimento, situacaoEconomica = beneficiario.SituacaoEconomica });

        conexao.Close();
    }

    public async Task<Beneficiario> ObterPorIdAsync(int id)
    {
        string sql = "SELECT * FROM Beneficiario WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { id = id });

        conexao.Close();

        return beneficiario;
    }

    public async Task<Beneficiario> ObterPorEmailAsync(string email)
    {
        string sql = "SELECT * FROM Beneficiario WHERE Email = @email";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { email = email });

        conexao.Close();

        return beneficiario;
    }

    public async Task<Beneficiario> LogarAsync(string email, string senha)
    {
        string sql = "SELECT * FROM Beneficiario WHERE Email = @email AND Senha = @senha";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { email = email, senha = senha });

        conexao.Close();

        return beneficiario;
    }

}