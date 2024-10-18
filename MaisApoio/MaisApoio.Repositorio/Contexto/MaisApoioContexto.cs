using System.Data.Common;
using System.Data.SqlClient;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string stringSql = "SERVER=.\\SQLEXPRESS;Database=MaisApoio;UID=sa;PWD=t2e4x6h1";

    public DbConnection ConectarSqlServer()
    {
        return new SqlConnection(stringSql);
    }
}