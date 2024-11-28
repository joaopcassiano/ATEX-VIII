using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using MaisApoio.Service;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private UploadimagemService _uploadimagemService = new UploadimagemService();

    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        try
        {
            var resposta = await _uploadimagemService.Upload(file);
            return Ok(new { imageUrl = resposta });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}