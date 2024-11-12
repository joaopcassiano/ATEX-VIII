using System.Data.Common;
using System.Data.SqlClient;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string _conexaoSql = "SERVER=.\\SQLEXPRESS;Database=MaisApoio;UID=sa;PWD=t2e4x6h1";
    private readonly IDriver _conexaoNeo4j;
    private IAsyncSession _neo4jSession;
    private readonly IDriver _conexaoNeo4j = GraphDatabase.Driver("neo4j+s://f608ef33.databases.neo4j.io:7687", AuthTokens.Basic("neo4j", "2U5mpcCaq1tLGFj5CSgc3GQtNCUa9VRozCIkzxEr_Ic"));
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
}