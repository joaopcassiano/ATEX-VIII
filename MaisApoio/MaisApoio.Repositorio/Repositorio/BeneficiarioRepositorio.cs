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
        string sql = "Insert into Beneficiario(ImagemPerfil) values (@imagem) WHERE BebeficiarioID = @id";

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

    // ----->>>>>   Consultas por Beneficiario
    public async Task<Beneficiario> ObterPorIdAsync(int id)
    {
        string sql = "SELECT BeneficiarioID AS ID, * FROM Beneficiario WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiarios = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { id = id }).ToList;

        conexao.Close();

        return beneficiarios;
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

    public async Task<Beneficiario> ObterPorCPFAsync(string cpf)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE CPF = @cpf";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { cpf = cpf });
        conexao.Close();
    }

    public async Task<Beneficiario> ObterPorNomeAsync(string nome)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Nome = @nome";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { nome = nome });
        conexao.Close();
    }
    public async Task<List<Beneficiario>> ObterPorNomeNecessidadeAsync(string nome, string necessidade)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Nome = @nome AND Necessidade = @necessidade";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { nome = nome, necessidade = necessidade });
        conexao.Close();
    }
    
    public async Task<List<Beneficiario>> ObterPorNomeSituacaoEconomicaAsync(string nome, string situacaoEconomica)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Nome = @nome AND SituacaoEconomica = @situacaoEconomica";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { nome = nome, situacaoEconomica = situacaoEconomica });
        conexao.Close();
    }
    public async Task<List<Beneficiario>> ObterPorNecessidadeSituacaoEconomicaAsync(string necessidade, string situacaoEconomica)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Necessidade = @necessidade AND SituacaoEconomica = @situacaoEconomica";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { necessidade = necessidade, situacaoEconomica = situacaoEconomica });
        conexao.Close();
    }
    public async Task<List<Beneficiario>> ObterPorNomeNecessidadeSituacaoEconomicaAsync(string nome, string necessidade, string situacaoEconomica)  
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE Nome = @nome AND Necessidade = @necessidade AND SituacaoEconomica = @situacaoEconomica";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { nome = nome, necessidade = necessidade, situacaoEconomica = situacaoEconomica });
        conexao.Close();
    }
    public async Task<List<Beneficiario>> ObterPorDataDeNascimentoAsync(datetime dataNascimento)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE DataNascimento = @dataNascimento";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { dataNascimento = dataNascimento });
        conexao.Close();
    }
    public async Task<List<Beneficiario>> ObterPorDataDeNascimentoNecessidadeAsync(datetime dataNascimento, string necessidade)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE DataNascimento = @dataNascimento AND Necessidade = @necessidade";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { dataNascimento = dataNascimento, necessidade = necessidade });
        conexao.Close();

    }
    public async Task<List<Beneficiario>> ObterPorDataDeNascimentoSituacaoEconomicaAsync(datetime dataNascimento, string situacaoEconomica)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE DataNascimento = @dataNascimento AND SituacaoEconomica = @situacaoEconomica";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { dataNascimento = dataNascimento, situacaoEconomica = situacaoEconomica });
        conexao.Close();
    }
    public async Task<List<Beneficiario>> ObterPorDataDeNascimentoNomeAsync(datetime dataNascimento, string nome)
    {
        string sql = "SELECT BeneficiarioID as ID, * FROM Beneficiario WHERE DataNascimento = @dataNascimento AND Nome = @nome";
        var conexao = _banco.ConectarSqlServer();
        conexao.Open();
        var beneficiario = await conexao.QueryAsync<Beneficiario>(sql, new { dataNascimento = dataNascimento, nome = nome });
        conexao.Close();
    }


}