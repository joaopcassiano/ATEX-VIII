using Dapper;
using MaisApoio.Dominio.Enumeradores;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Net;
using System.Net.Mail;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class CodigoValidacaoUsuarioRepositorio
{
    private MaisApoioContexto _banco = new MaisApoioContexto();
    public CodigoValidacaoUsuarioRepositorio() { }
    public async Task CriarCodigoAsync(string email, TipoUsuario tipoUsuario)
    {
        var aleatoria = new Random().Next(100000, 999999);
        string sql = "";

        Console.WriteLine((int)tipoUsuario);

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

        var _smtpClient = new SmtpClient("smtp-relay.brevo.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("7ed5e6003@smtp-brevo.com", "6kFIJjbxmhcnZOLW"),
            EnableSsl = true,
        };
        
        var mailMessage = new MailMessage
        {
            From = new MailAddress("mais.apoio.suporte@gmail.com"),
            Subject = "Mudar de senha",
            Body = GetHtmlBody(aleatoria.ToString()),
            IsBodyHtml = true,
        };

        var attachment = new Attachment("./logo.png");
        attachment.ContentId = "logo";
        mailMessage.Attachments.Add(attachment);
        mailMessage.To.Add(email);

        _smtpClient.Send(mailMessage);

        conexao.Close();
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


    string GetHtmlBody(string codigo)
    {
        return $@"
        <!DOCTYPE html>
        <html lang='pt-BR'>
        <head>
            <meta charset='UTF-8'>
            <style>
                /* O CSS pode ser o mesmo do exemplo acima */
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <img src='cid:logo' alt='Logo da Empresa' style='width:150px;' />
                </div>
                <div class='content'>
                    <h1>Seu Código de Validação</h1>
                    <p>Olá! Aqui está o seu código de validação para a troca da sua senha, ele expira em 5 minutos. Use-o para completar sua verificação:</p>
                    <span class='code'>{codigo}</span>
                    <p>Se você não solicitou este código, por favor, ignore este e-mail.</p>
                </div>
                <div class='footer'>
                    <p>&copy; 2024. Todos os direitos reservados. Isso é apenas um site teste, de um trabalho de universidade.</p>
                </div>
            </div>
        </body>
        </html>";
    }

}