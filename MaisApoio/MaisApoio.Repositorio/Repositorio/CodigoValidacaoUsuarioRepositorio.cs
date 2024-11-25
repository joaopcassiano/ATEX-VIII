using Dapper;
using MaisApoio.Dominio.Enumeradores;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using MaisApoio.Service;
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
        string sql;

        if ((int)tipoUsuario == 1)
        {
            sql = "SELECT * FROM Voluntario WHERE Email LIKE @email";
        }
        else if ((int)tipoUsuario == 2)
        {
            sql = "SELECT * FROM Doador WHERE Email LIKE @email";
        }
        else if ((int)tipoUsuario == 3)
        {
            sql = "SELECT * FROM Empresa WHERE Email LIKE @email";
        }
        else
        {
            sql = "SELECT * FROM Beneficiario WHERE Email LIKE @email";
        }

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var usuario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new { email = email });

        if (usuario == null)
        {
            throw new Exception("Usuário não encontrado");
        }

        var codigo = new CodigoValidacaoUsuario(tipoUsuario, email, aleatoria);

        string sqlCodigo = "Insert into CodigoValidacaoUsuario(tipoUsuario,email,codigo,dataExpiracao) VALUES (@tipoUsuario, @email, @codigo, @dataExpiracao)";

        await conexao.ExecuteAsync(sqlCodigo, new { tipoUsuario = codigo.TipoUsuario, email = codigo.Email, codigo = codigo.Codigo, dataExpiracao = codigo.DataExpiracao });

        conexao.Close();

        return aleatoria;

    }

    public async Task<int> VerificarCodigoAsync(string email, TipoUsuario tipoUsuario, int codigo)
    {
        string sql = "SELECT TOP 1 CodigoValidacaoUsuarioID as Id,* FROM CodigoValidacaoUsuario WHERE Email = @email AND TipoUsuario = @tipoUsuario AND DataExpiracao > GETDATE() AND Uso is null ORDER BY DataExpiracao DESC;";

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
            sql = "SELECT VoluntarioID as Id FROM Voluntario WHERE Email LIKE @email";
        }
        else if ((int)tipoUsuario == 2)
        {
            sql = "SELECT DoadorID as Id FROM Doador WHERE Email LIKE @email";
        }
        else if ((int)tipoUsuario == 3)
        {
            sql = "SELECT EmpresaID as Id FROM Empresa WHERE Email LIKE @email";
        }
        else
        {
            sql = "SELECT BeneficiarioID as Id FROM Beneficiario WHERE Email LIKE @email";
        }

        var usuarioId = await conexao.QueryFirstOrDefaultAsync<int>(sql, new { email = email });

        conexao.Close();

        return usuarioId;

    }
}