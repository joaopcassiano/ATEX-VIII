using System.Data.Common;
using System.Data.SqlClient;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string _conexaoSql = "Server=.\\SQLEXPRESS;Database=MaisApoio;Trusted_Connection=True;TrustServerCertificate=True;";//se quiser rodar a aplicação me chame: Anderson

    private readonly IDriver _conexaoNeo4j = GraphDatabase.Driver("bolt://localhost:76387", AuthTokens.Basic("x", "a"));//se quiser rodar a aplicação me chame: Anderson
    //Alterar                                                            localhost e porta                       Altere a senha

    public DbConnection ConectarSqlServer()
    {
        return new SqlConnection(_conexaoSql);
    }

    public IAsyncSession ConectarNeo4j()
    {
        return _conexaoNeo4j.AsyncSession(o => o.WithDatabase("neo4j"));
    }
}