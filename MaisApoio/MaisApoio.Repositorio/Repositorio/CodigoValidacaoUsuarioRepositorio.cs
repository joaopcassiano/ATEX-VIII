using Dapper;
using MaisApoio.Dominio.Enumeradores;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using MaisApoio.Service;
using Neo4j.Driver;
using System.Net;
using System.Net.Mail;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class CodigoValidacaoUsuarioRepositorio
{
    private MaisApoioContexto _banco;

    public CodigoValidacaoUsuarioRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task<int> CriarCodigoAsync(string email, TipoUsuario tipoUsuario)
    {
        var aleatoria = new Random().Next(100000, 999999);
        string sql = "";
        string neo4j = "";

        if ((int)tipoUsuario == 1)
        {
            neo4j = "MATCH (d:Voluntario {Email: $email}) RETURN d";
        }
        else if ((int)tipoUsuario == 2)
        {
            neo4j = "MATCH (d:Doador {Email: $email}) RETURN d";
        }
        else if ((int)tipoUsuario == 3)
        {
            neo4j = "MATCH (d:Empresa {Email: $email}) RETURN d";
        }
        else
        {
            sql = "SELECT * FROM Beneficiario WHERE Email LIKE @email";
        }



        if ((int)tipoUsuario == 4)
        {
            var conexao = _banco.ConectarSqlServer();

            conexao.Open();

            var usuario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { email = email });

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado");
            }

            conexao.Close();

        }
        else
        {
            var conexao = _banco.ConectarNeo4j();

            var usuarioNeo = (await (await conexao.RunAsync(neo4j, new { email })).ToListAsync()).FirstOrDefault();

            if (usuarioNeo == null)
            {
                throw new Exception("Usuário não encontrado");
            }

            await conexao.CloseAsync();
        }

        var conexaoCod = _banco.ConectarSqlServer();

        conexaoCod.Open();

        var codigo = new CodigoValidacaoUsuario(tipoUsuario, email, aleatoria);

        string sqlCodigo = "Insert into CodigoValidacaoUsuario(tipoUsuario,email,codigo,dataExpiracao) VALUES (@tipoUsuario, @email, @codigo, @dataExpiracao)";

        await conexaoCod.ExecuteAsync(sqlCodigo, new { tipoUsuario = codigo.TipoUsuario, email = codigo.Email, codigo = codigo.Codigo, dataExpiracao = codigo.DataExpiracao });

        conexaoCod.Close();

        return aleatoria;

    }

    public async Task<int> VerificarCodigoAsync(string email, TipoUsuario tipoUsuario, int codigo)
    {
        string sql = "SELECT TOP 1 CodigoValidacaoUsuarioID as Id,* FROM CodigoValidacaoUsuario WHERE Email = @email AND TipoUsuario = @tipoUsuario AND DataExpiracao > GETDATE() AND Uso is null ORDER BY DataExpiracao DESC;";
        string neo4j = "";
        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var usuarioCodigo = await conexao.QueryFirstOrDefaultAsync<CodigoValidacaoUsuario>(sql, new { tipoUsuario = tipoUsuario, email = email });

        if ((usuarioCodigo == null) || (usuarioCodigo.Codigo != codigo))
        {
            throw new Exception("Código invalido");
        }

        sql = $@"Update CodigoValidacaoUsuario SET Uso = @data Where CodigoValidacaoUsuarioID = @id;";

        await conexao.ExecuteAsync(sql, new { id = usuarioCodigo.ID, data = DateTime.Now });

        if ((int)tipoUsuario == 1)
        {
            neo4j = "MATCH (d:Voluntario {Email: $email}) RETURN d.VoluntarioID AS id";
        }
        else if ((int)tipoUsuario == 2)
        {
            neo4j = "MATCH (d:Doador {Email: $email}) RETURN d.DoadorID AS id";
        }
        else if ((int)tipoUsuario == 3)
        {
            neo4j = "MATCH (d:Empresa {Email: $email}) RETURN d.EmpresaID AS id";
        }
        else
        {
            sql = "SELECT BeneficiarioID as Id FROM Beneficiario WHERE Email LIKE @email";
        }

        var usuarioId = 0;

        if ((int)tipoUsuario == 4)
        {

            usuarioId = await conexao.QueryFirstOrDefaultAsync<int>(sql, new { email = email });

            conexao.Close();

        }
        else
        {
            var conexaoNeo = _banco.ConectarNeo4j();

            var result = await (await conexaoNeo.RunAsync(neo4j, new { email })).ToListAsync();
            
            usuarioId = int.Parse(result.FirstOrDefault()?["id"]?.ToString() ?? "0");

            await conexaoNeo.CloseAsync();
        }

        conexao.Close();

        return usuarioId;

    }
}