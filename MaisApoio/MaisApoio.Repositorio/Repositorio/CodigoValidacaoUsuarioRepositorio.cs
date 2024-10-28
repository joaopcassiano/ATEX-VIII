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
    private SmtpClient _smtpClient;

    public CodigoValidacaoUsuarioRepositorio()
    {
        _smtpClient = new SmtpClient("smtp-relay.brevo.com")
        {
            Port = 587, // Use 465 se preferir SSL
            Credentials = new NetworkCredential("7ed5e6003@smtp-brevo.com", "xsmtpsib-cf49abc39306c4beef18c7ad2b597056fb3a27a3767ccf5f5ef085a712c33433-gsrFKnbwAJ7QR23P"),
            EnableSsl = true,
        };
    }


    public async Task CriarCodigoAsync(string email, TipoUsuario tipoUsuario)
    {
        var aleatoria = new Random().Next(100000, 999999);
        string sql = "";

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

        var usuario = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, email);

        if (usuario == null)
        {
            throw new Exception("Usuário não encontrado");
        }

        var codigo = new CodigoValidacaoUsuario(tipoUsuario, email, aleatoria);

        string sqlCodigo = "Insert into CodigoValidacaoUsuario(tipoUsuario,email,codigo,dataExpiracao) VALUES (@tipoUsuario, @email, @codigo, @dataExpiracao)";

        await conexao.ExecuteAsync(sqlCodigo, codigo);

        var mailMessage = new MailMessage
        {
            From = new MailAddress("mais.apoio.suporte@gmail.com"),
            Subject = "Teste de Envio via Brevo",
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

    public async Task<bool> VerificarCodigoAsync(string email, TipoUsuario tipoUsuario, string codigo)
    {
        string sql = "SELECT * FROM CodigoValidacaoUsuario WHERE Email LIKE @email AND TipoUsuario = @tipoUsuario AND codigo LIKE @codigo";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var usuarioCodigo = await conexao.QueryFirstOrDefaultAsync<Beneficiario>(sql, new {tipoUsuario = tipoUsuario, email = email, codigo = codigo});

        conexao.Close();

        if (usuarioCodigo == null)
        {
            return false;
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