using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]/api")]
public class BeneficiarioController : ControllerBase
{
    private BeneficiarioRepositorio _beneficiarioRepositorio;

    public BeneficiarioController(BeneficiarioRepositorio beneficiarioRepositorio)
    {
        _beneficiarioRepositorio = beneficiarioRepositorio;
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> criar([FromBody] Beneficiario beneficiario)
    {
        await _beneficiarioRepositorio.CriarBeneficiario(beneficiario);

        return Ok(beneficiario);
    }
}