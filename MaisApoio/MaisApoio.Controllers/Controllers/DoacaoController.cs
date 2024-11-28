using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using MaisApoio.Models.Beneficiario.Requisicao;
using System.Data.Common;
using MaisApoio.Service;
using MaisApoio.MaisApoio.Controllers.Models;

[ApiController]
[Route("[controller]/api")]
public class DoacaoController : ControllerBase
{
    private DoacaoAplicacao _doacaoAplicacao;

    public DoacaoController(DoacaoAplicacao doacaoAplicacao)
    {
        _doacaoAplicacao = doacaoAplicacao;
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> CriarAsync([FromBody] DoacaoCriacao doacao)
    {
        try
        {
            var id = await _doacaoAplicacao.CriarAsync(new Doacao(doacao.DescricaoDoacao, doacao.Quantidade, doacao.DoadorID, doacao.BeneficiarioID));
            return Ok(id);

        }
        catch (Exception ex)
        {
            return StatusCode(400,ex.Message);
        }
    }


    [HttpGet]
    [Route("obter-por-beneficiario/{id}")]
    public async Task<IActionResult> ObterPorBeneficiarioAsync([FromRoute] int id)
    {
        try
        {
            var doacao = await _doacaoAplicacao.ObterPorBeneficiarioAsync(id);

            return Ok(doacao);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }

    }

    [HttpGet]
    [Route("obter-por-doador/{id}")]
    public async Task<IActionResult> ObterPorDoadorAsync([FromRoute] int id)
    {
        try
        {
            var doacao = await _doacaoAplicacao.ObterPorDoadorAsync(id);

            return Ok(doacao);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }

    }

}