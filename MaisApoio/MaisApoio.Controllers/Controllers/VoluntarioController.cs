using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.MaisApoio.Controllers.Models.Voluntario.Requisicao;
using MaisApoio.MaisApoio.Controllers.Models.Voluntario.Resposta;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.Models.Beneficiario.Requisicao;
using MaisApoio.Models.Doador.Requisicao;
using MaisApoio.Service;
using Microsoft.AspNetCore.Mvc;

namespace MaisApoio.MaisApoio.Controllers.Controllers
{
    [ApiController]
    [Route("[controller]/api")]
    public class VoluntarioController : ControllerBase
    {
        private VoluntarioAplicacao _voluntarioAplicacao;
        private EnderecoVoluntarioAplicacao _enderecoAplicacao;

        public VoluntarioController(VoluntarioAplicacao voluntarioAplicacao, EnderecoVoluntarioAplicacao enderecoVoluntario)
        {
            _voluntarioAplicacao = voluntarioAplicacao;
            _enderecoAplicacao = enderecoVoluntario;

        }

        [HttpPost]
        [Route("criar")]
        public async Task<IActionResult> CriarAsync([FromBody] VoluntarioCriacao voluntarioCriacao)
        {
            try
            {
                var doadorID = await _voluntarioAplicacao.CriarAsync(new Voluntario(voluntarioCriacao.Nome, voluntarioCriacao.Cpf, voluntarioCriacao.Telefone, voluntarioCriacao.Email, voluntarioCriacao.DataNascimento, voluntarioCriacao.Senha, voluntarioCriacao.AreaAtuacao));

                try
                {
                    var id = await _enderecoAplicacao.CriarAsync(new EnderecoVoluntario(voluntarioCriacao.Rua, voluntarioCriacao.Bairro, voluntarioCriacao.Numero, voluntarioCriacao.Complemento, voluntarioCriacao.Cidade, voluntarioCriacao.Estado, voluntarioCriacao.Cep, doadorID));
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Apagou");
                    await _voluntarioAplicacao.ExclusaoFisicaAsync(doadorID);
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

                EmailService.EnviarEmail(voluntarioCriacao.Email, "Cadastro no sistema +Apoio", mensagem);

                return Ok("Usuário Criado com sucesso!");
            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }
        }

        [HttpPost]
        [Route("logar")]
        public async Task<IActionResult> LogarAsync([FromBody] VoluntarioLogar voluntarioLogar)
        {
            try
            {
                int id = await _voluntarioAplicacao.LogarAsync(voluntarioLogar.Email, voluntarioLogar.Senha); //encriptografar

                return Ok(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet]
        [Route("obterPorId/{id}")]
        public async Task<IActionResult> ObterporIdAsync([FromRoute] int id)
        {
            try
            {
                var voluntario = await _voluntarioAplicacao.ObterPorIdAsync(id);

                VoluntarioLogado voluntarioLogado = new VoluntarioLogado(voluntario);

                return Ok(voluntarioLogado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut]
        [Route("trocar-senha/{id}")]
        public async Task<IActionResult> TrocarSenha([FromRoute] int id, [FromBody] VoluntarioTrocarSenha voluntarioTrocarSenha)
        {
            try
            {
                await _voluntarioAplicacao.TrocarDeSenhaAsync(id, voluntarioTrocarSenha.ConfirmarSenha, voluntarioTrocarSenha.Senha);

                return Ok("Senha trocada com sucesso");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut]
        [Route("carregar-imagem/{id}")]
        public async Task<IActionResult> Carregarimagem([FromRoute] int id, [FromBody] ImagemCarregada imagem)
        {
            try
            {
                await _voluntarioAplicacao.CarregarImagemAsync(imagem.Imagem, id);
                return Ok("Imagem carregada com sucesso!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
