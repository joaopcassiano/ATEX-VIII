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
            sql = "SELECT * FROM Beneficiario WHERE Email LIKE @email";
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
            sql = "SELECT * FROM Voluntario WHERE Email LIKE @email";
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

    public async Task<bool> VerificarCodigoAsync(string email, TipoUsuario tipoUsuario, int codigo)
    {
        string sql = "SELECT TOP 1 * FROM CodigoValidacaoUsuario WHERE Email LIKE @email AND TipoUsuario = @tipoUsuario AND DataExpiracao > GETDATE() ORDER BY DataExpiracao DESC;";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var usuarioCodigo = await conexao.QueryFirstOrDefaultAsync<CodigoValidacaoUsuario>(sql, new { tipoUsuario = tipoUsuario, email = email });

        conexao.Close();

        if ((usuarioCodigo == null) || (usuarioCodigo.Codigo != codigo))
        {
            throw new Exception("Código invalido");
        }

        return true;

    }

}