using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
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
        string sql = "SELECT BeneficiarioID AS ID, * FROM Beneficiario";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiarios = await conexao.QueryAsync<Beneficiario>(sql);

        conexao.Close();

        return beneficiarios.ToList();
    }

    public async Task CarregarImagemAsync(string imagem, int id)
    {
        string sql = "update Beneficiario set ImagemPerfil = @imagem where BeneficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = id, imagem = imagem });

        conexao.Close();
    }

    public async Task<int> CriarAsync(Beneficiario beneficiario)
    {

        string sql = @"Insert into Beneficiario(nome,cpf,telefone,email,necessidade,senha,dataNascimento,situacaoEconomica,ativo) 
        OUTPUT INSERTED.BeneficiarioID as ID
        values (@nome,@cpf,@telefone,@email,@necessidade,@senha,@dataNascimento,@situacaoEconomica,@ativo);";

        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var id = await conexao.QueryFirstAsync<int>(sql, new
        {
            nome = beneficiario.Nome,
            cpf = beneficiario.CPF,
            telefone = beneficiario.Telefone,
            email = beneficiario.Email,
            necessidade = beneficiario.Necessidade,
            senha = beneficiario.Senha,
            dataNascimento = beneficiario.DataNascimento,
            situacaoEconomica = beneficiario.SituacaoEconomica,
            ativo = beneficiario.Ativo
        });

        await conexao.CloseAsync();

        return id;

    }

    public async Task AtualizarAsync(Beneficiario beneficiario)
    {
        string sql = "UPDATE Beneficiario SET nome = @nome, necessidade = @necessidade, cpf = @cpf, telefone = @telefone, dataNascimento = @dataNascimento, situacaoEconomica = @situacaoEconomica, ativo = @ativo WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = beneficiario.ID, necessidade = beneficiario.Necessidade, telefone = beneficiario.Telefone, cpf = beneficiario.CPF, ativo = beneficiario.Ativo, nome = beneficiario.Nome, dataNascimento = beneficiario.DataNascimento, situacaoEconomica = beneficiario.SituacaoEconomica });

        conexao.Close();
    }

    public async Task<Beneficiario> ObterPorIdAsync(int id)
    {
        string sql = "SELECT BeneficiarioID AS ID, * FROM Beneficiario WHERE BeneficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { id = id });

        conexao.Close();

        return beneficiario;
    }

    public async Task<Beneficiario> ObterPorEmailAsync(string email)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Email = @email";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { email = email });

        conexao.Close();

        return beneficiario;
    }

    public async Task<Beneficiario> LogarAsync(string email, string senha)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Email = @email AND Senha = @senha";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { email = email, senha = senha });

        conexao.Close();

        return beneficiario;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        string sql = "DELETE FROM Beneficiario WHERE BeneficiarioID = @id";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        await conexao.ExecuteAsync(sql, new { id = id });
        conexao.Close();
    }

}