using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using MaisApoio.Models.Beneficiario.Requisicao;
using System.Data.Common;
using MaisApoio.Service;
using MaisApoio.MaisApoio.Controllers.Models;

[ApiController]
[Route("[controller]/api")]
public class EmpregoController : ControllerBase
{
    private EmpregoAplicacao _empregoAplicacao;

    public EmpregoController(EmpregoAplicacao empregoAplicacao)
    {
        _empregoAplicacao = empregoAplicacao;
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> CriarAsync([FromBody] EmpregoCriar emprego)
    {
        try
        {
            var id = await _empregoAplicacao.CriarAsync(new Emprego(emprego.TipoEmprego, emprego.DescricaoEmprego, emprego.Salario, emprego.EmpresaID, emprego.BeneficiarioID));
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
            var emprego = await _empregoAplicacao.ObterPorBeneficiarioAsync(id);

            return Ok(emprego);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }

    }

    [HttpGet]
    [Route("obter-por-empresa/{id}")]
    public async Task<IActionResult> ObterPorEmpresaAsync([FromRoute] int id)
    {
        try
        {
            var emprego = await _empregoAplicacao.ObterPorDoadorAsync(id);

            return Ok(emprego);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }

    }

}