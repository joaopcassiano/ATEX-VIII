using MaisApoio.Dominio.Enumeradores;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using Microsoft.AspNetCore.Mvc;
using MaisApoio.Service;

[ApiController]
[Route("[controller]/api")]
public class CodigoValidacaoUsuarioController : ControllerBase
{
    private CodigoValidacaoUsuarioRepositorio _codigoValidacaoUsuarioRepositorio;

    public CodigoValidacaoUsuarioController(CodigoValidacaoUsuarioRepositorio codigoValidacaoUsuarioRepositorio)
    {
        _codigoValidacaoUsuarioRepositorio = codigoValidacaoUsuarioRepositorio;
    }

    [HttpGet]
    public IActionResult teste()
    {
        return Ok("Teste realizado com sucesso!");
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> criar([FromBody] string email, TipoUsuario tipoUsuario)
    {
        var aleatoria = await _codigoValidacaoUsuarioRepositorio.CriarCodigoAsync(email, tipoUsuario);

        string mensagem = $@"
         <!DOCTYPE html>
         <html lang='pt-BR'>
         <head>
             <meta charset='UTF-8'>
             <style>
                 body {{
                     font-family: Arial, sans-serif;
                     background-color: #f4f4f4;
                     margin: 0;
                     padding: 0;
                 }}
                 .container {{
                     width: 100%;
                     max-width: 600px;
                     margin: 0 auto;
                     background-color: #ffffff;
                     border-radius: 8px;
                     overflow: hidden;
                     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                 }}
                 .header {{
                     background-color: #007bff;
                     padding: 20px;
                     text-align: center;
                 }}
                 .header img {{
                     width: 150px;
                 }}
                 .content {{
                     padding: 30px;
                 }}
                 .content h1 {{
                     color: #333333;
                     font-size: 24px;
                     margin-bottom: 10px;
                 }}
                 .content p {{
                     color: #555555;
                     line-height: 1.6;
                     margin-bottom: 20px;
                 }}
                 .code {{
                     display: block;
                     background-color: #f4f4f4;
                     padding: 10px;
                     text-align: center;
                     font-size: 20px;
                     letter-spacing: 2px;
                     color: #333333;
                     border-radius: 5px;
                     margin: 10px 0;
                 }}
                 .footer {{
                     background-color: #007bff;
                     padding: 10px;
                     text-align: center;
                     color: #ffffff;
                     font-size: 12px;
                 }}
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
                     <span class='code'>{aleatoria}</span>
                     <p>Se você não solicitou este código, por favor, ignore este e-mail.</p>
                 </div>
                 <div class='footer'>
                     <p>&copy; 2024. Todos os direitos reservados. Isso é apenas um site teste, de um trabalho de universidade.</p>
                 </div>
             </div>
         </body>
         </html>";

        EmailService.EnviarEmail(email, "Mudar de Senha", mensagem);

        return Ok();
    }
}