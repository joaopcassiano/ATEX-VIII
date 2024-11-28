using Dapper;
using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EmpregoRepositorio
{
    private MaisApoioContexto _banco;

    public EmpregoRepositorio()
    {
        _banco = new MaisApoioContexto();
    }


    public async Task<int> CriarAsync(Emprego emprego)
    {

        string sql = @"Insert into Emprego(DescricaoDoacao,Quantidade,DataDoacao,BeneficiarioID,DoadorID,Ativo) 
        OUTPUT INSERTED.DoacaoID as ID
        values (@DescricaoDoacao,@Quantidade,@DataDoacao,@BeneficiarioID,@DoadorID,@Ativo);";

        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var id = await conexao.QueryFirstAsync<int>(sql, new
        {
            DescricaoDoacao = doacao.DescricaoDoacao,
            Quantidade = doacao.Quantidade,
            DataDoacao = doacao.DataDoacao,
            BeneficiarioID = doacao.BeneficiarioID,
            DoadorID = doacao.DoadorID,
            Ativo = doacao.Ativo
        });

        await conexao.CloseAsync();

        return id;

    }

    public async Task<List<Doacao>> ObterPorBeneficiarioAsync(int id)
    {
        string sql = "SELECT DoacaoID AS ID, * FROM Doacao WHERE BeneficiarioID = @id AND Ativo = 1";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var doacao = (await conexao.QueryAsync<Doacao>(sql, new { id = id })).ToList();

        conexao.Close();

        return doacao;
    }

    public async Task<List<DoacaoDoador>> ObterPorDoadorAsync(int id)
    {
        string sql = @"
        SELECT 
        d.DoacaoID,
        d.DescricaoDoacao,
        d.Quantidade,
        d.DataDoacao,
        d.BeneficiarioID,
        d.DoadorID,
        b.Nome,
        b.Email,
        b.Telefone,
        b.DataNascimento,
        b.ImagemPerfil,
        b.CPF,
        b.Necessidade,
        b.SituacaoEconomica,
        d.Ativo
        FROM Doacao d
        INNER JOIN Beneficiario b ON d.BeneficiarioID = b.BeneficiarioID
        WHERE DoadorID = @id AND d.Ativo = 1";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var doacao = (await conexao.QueryAsync<DoacaoDoador>(sql, new { id = id })).ToList();

        conexao.Close();

        return doacao;
    }

}