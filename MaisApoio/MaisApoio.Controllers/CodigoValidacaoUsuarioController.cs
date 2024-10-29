using MaisApoio.Dominio.Enumeradores;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> criar([FromBody] string email,TipoUsuario tipoUsuario)
    {
        await _codigoValidacaoUsuarioRepositorio.CriarCodigoAsync(email,tipoUsuario);

        return Ok();
    }
}