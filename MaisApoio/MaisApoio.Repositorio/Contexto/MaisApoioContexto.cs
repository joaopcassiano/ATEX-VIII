<<<<<<< HEAD
using System.Data.Common;
using System.Data.SqlClient;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string _conexaoSql = "SERVER=.\\SQLEXPRESS;Database=MaisApoio;UID=sa;PWD=t2e4x6h1";
    private readonly IDriver _conexaoNeo4j = GraphDatabase.Driver("neo4j+s://652c81ae.databases.neo4j.io", AuthTokens.Basic("neo4j", "t2e4x6h1"));
    //Alterar                                                            localhost e porta                       Altere a senha
    //Alteração Realizada
    public DbConnection ConectarSqlServer()
    {
        return new SqlConnection(_conexaoSql);
    }

    public IAsyncSession ConectarNeo4j()
    {
        return _conexaoNeo4j.AsyncSession(o => o.WithDatabase("neo4j"));
    }
=======
using System.Data.Common;
using System.Data.SqlClient;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string _conexaoSql = "Server=.\\SQLEXPRESS;Database=MaisApoio;Trusted_Connection=True;TrustServerCertificate=True;";

    private readonly IDriver _conexaoNeo4j = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "senha_do_neo4j"));
    //Alterar                                                            localhost e porta                       Altere a senha

    public DbConnection ConectarSqlServer()
    {
        return new SqlConnection(_conexaoSql);
    }

    public IAsyncSession ConectarNeo4j()
    {
        return _conexaoNeo4j.AsyncSession(o => o.WithDatabase("neo4j"));
    }
>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
}