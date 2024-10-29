using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]/api")]
public class BeneficiarioController : ControllerBase
{

    public BeneficiarioController() { }
    private BeneficiarioRepositorio beneficiarioRepositorio = new BeneficiarioRepositorio();

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> criar([FromBody] Beneficiario beneficiario)
    {
        await beneficiarioRepositorio.CriarBeneficiario(beneficiario);

        return Ok(beneficiario);
    }
}