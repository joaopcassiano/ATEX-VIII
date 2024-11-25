using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using MaisApoio.Models.Beneficiario.Requisicao;
using System.Data.Common;
using MaisApoio.Service;
using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.Models.EnderecoBeneficiario.Resposta;

[ApiController]
[Route("[controller]/api")]
public class EnderecoBeneficiarioController : ControllerBase
{
    private EnderecoBeneficiarioAplicacao _enderecoAplicacao;

    public EnderecoBeneficiarioController(EnderecoBeneficiarioAplicacao enderecoAplicacao)
    {
        _enderecoAplicacao = enderecoAplicacao;
    }

    [HttpGet]
    [Route("obter-endereco-por-beneficiario/{id}")]
    public async Task<IActionResult> ObterEnderecoPorBeneficiarioAsync([FromRoute] int id)
    {
        try
        {
            var enderecoBeneficiario = await _enderecoAplicacao.ObterEnderecoPorBeneficiarioAsync(id);

            var enderecoBeneficiarioResposta = new EnderecoBeneficiarioResposta(enderecoBeneficiario);

            return Ok(enderecoBeneficiarioResposta);
        }
        catch (Exception ex)
        {
            return StatusCode(400, ex.Message);
        }

    }
}