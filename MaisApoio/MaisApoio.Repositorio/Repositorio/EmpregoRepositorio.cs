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

        string sql = @"Insert into Emprego(DescricaoEmprego,Salario,TipoEmprego,DataAdmissao,BeneficiarioID,EmpresaID,Ativo) 
        OUTPUT INSERTED.EmpresaID as ID
        values (@DescricaoEmprego,@Salario,@TipoEmprego,@DataAdmissao,@BeneficiarioID,@EmpresaID,@Ativo);";

        var conexao = _banco.ConectarSqlServer();

        await conexao.OpenAsync();

        var id = await conexao.QueryFirstAsync<int>(sql, new
        {
            DescricaoEmprego = emprego.DescricaoEmprego,
            TipoEmprego = emprego.TipoEmprego,
            DataAdmissao = emprego.DataAdmissao,
            BeneficiarioID = emprego.BeneficiarioID,
            EmpresaID = emprego.EmpresaID,
            Salario = emprego.Salario,
            Ativo = emprego.Ativo
        });

        await conexao.CloseAsync();

        return id;

    }

    public async Task<List<Emprego>> ObterPorBeneficiarioAsync(int id)
    {
        string sql = "SELECT EmpregoID AS ID, * FROM Emprego WHERE BeneficiarioID = @id AND Ativo = 1";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var emprego = (await conexao.QueryAsync<Emprego>(sql, new { id = id })).ToList();

        conexao.Close();

        return emprego;
    }

    public async Task<List<EmpregoEmpresa>> ObterPorEmpresaAsync(int id)
    {
        string sql = @"
        SELECT 
        d.EmpregoID,
        d.DescricaoEmprego,
        d.TipoEmprego,
        d.Salario,
        d.DataAdmissao,
        d.BeneficiarioID,
        d.EmpresaID,
        b.Nome,
        b.Email,
        b.Telefone,
        b.DataNascimento,
        b.ImagemPerfil,
        b.CPF,
        b.Necessidade,
        b.SituacaoEconomica,
        d.Ativo
        FROM Emprego d
        INNER JOIN Beneficiario b ON d.BeneficiarioID = b.BeneficiarioID
        WHERE d.EmpresaID = @id AND d.Ativo = 1";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var empresa = (await conexao.QueryAsync<EmpregoEmpresa>(sql, new { id = id })).ToList();

        conexao.Close();

        return empresa;
    }

}