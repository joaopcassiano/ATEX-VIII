using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using MaisApoio.Models.Beneficiario.Requisicao;
using System.Data.Common;
using MaisApoio.Service;
using MaisApoio.MaisApoio.Controllers.Models;

[ApiController]
[Route("[controller]/api")]
public class BeneficiarioController : ControllerBase
{
    private BeneficiarioAplicacao _beneficiarioAplicacao;
    private EnderecoBeneficiarioAplicacao _enderecoAplicacao;

    public BeneficiarioController(BeneficiarioAplicacao beneficiarioAplicacao, EnderecoBeneficiarioAplicacao enderecoAplicacao)
    {
        _beneficiarioAplicacao = beneficiarioAplicacao;
        _enderecoAplicacao = enderecoAplicacao;
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> CriarAsync([FromBody] BeneficiarioCriacao beneficiarioCriacao)
    {
        try
        {
            var beneficiarioID = await _beneficiarioAplicacao.CriarAsync(new Beneficiario(beneficiarioCriacao.Nome, beneficiarioCriacao.Cpf, beneficiarioCriacao.Necessidade, beneficiarioCriacao.Telefone, beneficiarioCriacao.Email, beneficiarioCriacao.SituacaoEconomica, beneficiarioCriacao.DataNascimento, beneficiarioCriacao.Senha));

            try
            {
                var id = await _enderecoAplicacao.CriarAsync(new EnderecoBeneficiario(beneficiarioCriacao.Rua, beneficiarioCriacao.Bairro, beneficiarioCriacao.Numero, beneficiarioCriacao.Complemento, beneficiarioCriacao.Cidade, beneficiarioCriacao.Estado, beneficiarioCriacao.Cep, beneficiarioID));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Apagou");
                await _beneficiarioAplicacao.ExclusaoFisicaAsync(beneficiarioID);
                throw new Exception(ex.Message);
            }

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
                    <h1>Bem-vindo(a) ao +Apoio!</h1>
                    <p>É um prazer ter você conosco! O +Apoio é uma plataforma que acredita em uma sociedade mais justa e colaborativa. 
                    Nossa missão é oferecer suporte e esperança para aqueles que mais precisam, facilitando o acesso a recursos essenciais e promovendo a solidariedade.</p>
                    
                    <p>Ao se juntar a nós, você se torna parte de uma rede de apoio que conecta pessoas em situação de vulnerabilidade a doações de alimentos, roupas e produtos de higiene, além de incentivar o voluntariado e disponibilizar oportunidades de emprego para fomentar autonomia e desenvolvimento.</p>

                    <p>O +Apoio não é apenas um site; é um movimento que une empresas, organizações sociais e cidadãos comprometidos com uma cultura de inclusão e responsabilidade social. Juntos, estamos construindo uma sociedade mais solidária e igualitária.</p>

                    <p>Seja bem-vindo(a) a essa causa transformadora! Estamos muito felizes por você estar aqui.</p>
                 </div>
                 <div class='footer'>
                     <p>&copy; 2024. Todos os direitos reservados. Isso é apenas um site teste, de um trabalho de universidade.</p>
                 </div>
             </div>
         </body>
         </html>";

            EmailService.EnviarEmail(beneficiarioCriacao.Email, "Cadastro no sistema +Apoio", mensagem);

            return Ok("Usuário Criado com sucesso!");
        }
        catch (Exception ex)
        {
            return StatusCode(400, ex.Message);
        }
    }

    [HttpPost]
    [Route("logar")]
    public async Task<IActionResult> LogarAsync([FromBody] BeneficiarioLogar beneficiarioLogar)
    {
        try
        {
            int id = await _beneficiarioAplicacao.LogarAsync(beneficiarioLogar.Email, beneficiarioLogar.Senha);

            return Ok(id);
        }
        catch (Exception ex)
        {
            return StatusCode(500,ex.Message);
        }

    }

    [HttpGet]
    [Route("obterPorId/{id}")]
    public async Task<IActionResult> ObterporIdAsync([FromRoute] int id)
    {
        try
        {
            var beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(id);

            BeneficiarioLogado beneficiarioLogado = new BeneficiarioLogado(beneficiario);
            
            return Ok(beneficiarioLogado);
        }
        catch (Exception ex)
        {
            return StatusCode(500,ex.Message);
        }

    }
}