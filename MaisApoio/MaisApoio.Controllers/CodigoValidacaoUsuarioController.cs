using MaisApoio.Dominio.Enumeradores;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]/api")]
public class CodigoValidacaoUsuarioController : ControllerBase
{

    public CodigoValidacaoUsuarioController() { }
    private CodigoValidacaoUsuarioRepositorio codigos = new CodigoValidacaoUsuarioRepositorio();

    [HttpGet]
    public IActionResult teste()
    {
        return Ok("Teste realizado com sucesso!");
    }

    [HttpPost]
    [Route("criar")]
    public async Task<IActionResult> criar([FromBody] string email,TipoUsuario tipoUsuario)
    {
        await codigos.CriarCodigoAsync(email,tipoUsuario);

        return Ok();
    }
}