using System.Collections;
using System.Data.SqlTypes;
using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class BeneficiarioRepositorio
{
    private MaisApoioContexto _bancoSql = new MaisApoioContexto();

    public async Task<List<Beneficiario>> ObterTodos()
    {
        string sql = "SELECT * FROM Beneficiario";

        var conexao = _bancoSql.ConectarSqlServer();

        conexao.Open();

        var beneficiarios = await conexao.QueryAsync<Beneficiario>(sql);

        conexao.Close();

        return beneficiarios.ToList();
    }

}