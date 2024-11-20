using System.Net;
using System.Net.Mail;

namespace MaisApoio.Service;
public static class EmailService
{
    public static void EnviarEmail(string destinatario, string assunto, string mensagem)
    {
        using (var _smtpClient = new SmtpClient("smtp-relay.brevo.com"))
        {
            _smtpClient.Port = 587;
            _smtpClient.Credentials = new NetworkCredential("7ed5e6003@smtp-brevo.com", "6kFIJjbxmhcnZOLW");
            _smtpClient.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress("mais.apoio.suporte@gmail.com"),
                Subject = assunto,
                Body = mensagem,
                IsBodyHtml = true,
            };

            var attachment = new Attachment("./logo.png");
            attachment.ContentId = "logo";
            mailMessage.Attachments.Add(attachment);
            mailMessage.To.Add(destinatario);
            _smtpClient.Send(mailMessage);
        }
    }
}
