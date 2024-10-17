using System.Data.Common;
using System.Data.SqlClient;

namespace MaisApoio.MaisApoio.Repositorio.Contexto;

public class MaisApoioContexto
{
    private readonly string stringSql = "Server=ANDERSON\\SQLEXPRESS;Database=MaisApoio;Trusted_Connection=True;TrustServerCertificate=True;";

    public DbConnection ConectarSqlServer()
    {
        return new SqlConnection(stringSql);
    }
}