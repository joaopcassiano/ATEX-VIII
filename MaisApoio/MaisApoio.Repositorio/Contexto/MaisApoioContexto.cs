using System.Data.Common;
using System.Data.SqlClient;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string _conexaoSql = "Server=.\\SQLEXPRESS;Database=MaisApoio;Trusted_Connection=True;TrustServerCertificate=True;";        
    private readonly IDriver _conexaoNeo4j = GraphDatabase.Driver(
            "bolt://localhost:7687",  
            AuthTokens.Basic("maisapoio", "Anderson") 
        );

    public DbConnection ConectarSqlServer()
    {
        return new SqlConnection(_conexaoSql);
    }

    public IAsyncSession ConectarNeo4j()
    {
        return _conexaoNeo4j.AsyncSession(o => o.WithDatabase("neo4j"));
    }
}