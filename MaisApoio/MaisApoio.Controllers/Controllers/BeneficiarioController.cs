using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using MaisApoio.Models.Beneficiario.Requisicao;

[ApiController]
[Route("[controller]/api")]
public class BeneficiarioController : ControllerBase
{
    private BeneficiarioAplicacao _beneficiarioAplicacao;
    private EnderecoAplicacao _enderecoAplicacao;

    public BeneficiarioController(BeneficiarioAplicacao beneficiarioAplicacao, EnderecoAplicacao enderecoAplicacao)
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
            int enderecoID = await _enderecoAplicacao.CriarAsync(new Endereco(beneficiarioCriacao.Rua, beneficiarioCriacao.Bairro, beneficiarioCriacao.Numero, beneficiarioCriacao.Complemento, beneficiarioCriacao.Cidade, beneficiarioCriacao.Estado, beneficiarioCriacao.Cep));

            await _beneficiarioAplicacao.CriarAsync(new Beneficiario(beneficiarioCriacao.Nome, beneficiarioCriacao.Cpf, beneficiarioCriacao.Necessidade, beneficiarioCriacao.Telefone, beneficiarioCriacao.Email, beneficiarioCriacao.SituacaoEconomica, beneficiarioCriacao.DataNascimento, enderecoID, beneficiarioCriacao.Senha));

            return Ok("Deu certo!");
        }
        catch (Exception ex)
        {
            return StatusCode(400,ex.Message);
        }
    }

    [HttpPost]
    [Route("logar")]
    public async Task<IActionResult> LogarAsync([FromBody] BeneficiarioLogar beneficiarioLogar)
    {
        int id = await _beneficiarioAplicacao.LogarAsync(beneficiarioLogar.Email, beneficiarioLogar.Senha);

        return Ok(id);
    }
}