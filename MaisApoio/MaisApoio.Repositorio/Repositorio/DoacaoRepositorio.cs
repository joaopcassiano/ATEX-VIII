using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class DoacaoRepositorio
{
    private MaisApoioContexto _banco;

    public DoacaoRepositorio()
    {
        _banco = new MaisApoioContexto();
    }
    public async Task<List<Doacao>> ObterTodosAsync()
    {
        string sql = "SELECT DoacaoID AS ID, * FROM Doacao ";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var doacao = await conexao.QueryAsync<Beneficiario>(sql);

        conexao.Close();

        return doacao.ToList();
    }

    public async Task<int> CriarAsync(DoacaoRepositorio doacao)
    {

        string sql = @"Insert into Doacao(tituloVaga,descricaoVaga,salario,localizacao) 
        OUTPUT INSERTED.DoacaoID as ID
        values (@tituloVaga, @descricaoVaga, @salario, @localizacao);";

        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var id = await conexao.QueryFirstAsync<int>(sql, new
        {
            tituloVaga = doacao.TituloVaga,
            descricaoVaga = doacao.DescricaoVaga,
            salario = doacao.Salario,
            localizacao = doacao.Localizacao
            ativo = beneficiario.Ativo
        });

        await conexao.CloseAsync();

        return id;

    }

    public async Task AtualizarAsync(Doacao doacao)
    {
        string sql = "UPDATE Doacao SET tituloVaga = @tituloVaga, descricaoVaga = @descricaoVaga, salario = @salario, localizacao = @localizacao, ativo = @ativo WHERE DoacaoID = @id";

        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        await conexao.ExecuteAsync(sql, new 
        { 
            id = doacao.DoacaoID, 
            tituloVaga = doacao.TituloVaga, 
            descricaoVaga = doacao.DescricaoVaga, 
            salario = doacao.Salario, 
            localizacao = doacao.Localizacao, 
            ativo = doacao.Ativo 
        });

        await conexao.CloseAsync();
    }

    public async Task<Doacao> ObterPorIdAsync(int id)
    {
        string sql = "SELECT DoacaoID AS ID, tituloVaga, descricaoVaga, salario, localizacao, ativo FROM Doacao WHERE DoacaoID = @id";

        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var doacao = await conexao.QueryFirstOrDefaultAsync<Doacao>(sql, new { id });

        await conexao.CloseAsync();

        return doacao;
    }

    public async Task<List<Doacao>> ObterPorTituloVagaAsync(string tituloVaga)
    {
        string sql = "SELECT DoacaoID AS ID, tituloVaga, descricaoVaga, salario, localizacao, ativo FROM Doacao WHERE tituloVaga = @tituloVaga";
        
        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var doacoes = await conexao.QueryAsync<Doacao>(sql, new { tituloVaga });

        await conexao.CloseAsync();

        return doacoes.ToList();
    }

    public async Task<List<Doacao>> ObterPorLocalizacaoAsync(string localizacao)
    {
        string sql = "SELECT DoacaoID AS ID, tituloVaga, descricaoVaga, salario, localizacao, ativo FROM Doacao WHERE localizacao = @localizacao";
        
        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var doacoes = await conexao.QueryAsync<Doacao>(sql, new { localizacao });

        await conexao.CloseAsync();

        return doacoes.ToList();
    }

    public async Task<List<Doacao>> ObterPorSalarioAsync(decimal salario)
    {
        string sql = "SELECT DoacaoID AS ID, tituloVaga, descricaoVaga, salario, localizacao, ativo FROM Doacao WHERE salario = @salario";
        
        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var doacoes = await conexao.QueryAsync<Doacao>(sql, new { salario });

        await conexao.CloseAsync();

        return doacoes.ToList();
    }

    public async Task<List<Doacao>> ObterPorAtivoAsync(bool ativo)
    {
        string sql = "SELECT DoacaoID AS ID, tituloVaga, descricaoVaga, salario, localizacao, ativo FROM Doacao WHERE ativo = @ativo";
        
        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var doacoes = await conexao.QueryAsync<Doacao>(sql, new { ativo });

        await conexao.CloseAsync();

        return doacoes.ToList();
    }
}
