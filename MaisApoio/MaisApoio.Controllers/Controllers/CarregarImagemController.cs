using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoogleDriveUploader.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoogleDriveController : ControllerBase
    {
        private readonly DriveService _driveService;

        public GoogleDriveController()
        {
            // Inicializa a autenticação com o arquivo JSON
            var credential = GoogleCredential.FromFile(@"C:\Users\anderson\Desktop\Html\Repositorio\maisapoio-7d555b0f8ea9.json")
                .CreateScoped(DriveService.ScopeConstants.DriveFile);

            _driveService = new DriveService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "GoogleDriveUploader",
            });
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Nenhum arquivo foi enviado." }); // Resposta como JSON

            try
            {
                // Cria a solicitação de upload usando o stream do arquivo
                using var fileStream = file.OpenReadStream();
                var fileMetadata = new Google.Apis.Drive.v3.Data.File
                {
                    Name = file.FileName
                };

                var request = _driveService.Files.Create(fileMetadata, fileStream, file.ContentType);
                request.Fields = "id";
                var response = await request.UploadAsync();

                if (response.Status != Google.Apis.Upload.UploadStatus.Completed)
                {
                    return StatusCode(500, new { message = "Erro ao fazer upload para o Google Drive." }); // Resposta como JSON
                }

                // Torna o arquivo público
                var fileId = request.ResponseBody.Id;
                var permission = new Google.Apis.Drive.v3.Data.Permission
                {
                    Role = "reader",
                    Type = "anyone",
                };
                await _driveService.Permissions.Create(permission, fileId).ExecuteAsync();

                // Cria a URL pública
                var fileUrl = $"https://drive.google.com/uc?id={fileId}";

                return Ok(new { url = fileUrl }); // Retorno como JSON
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fazer upload: {ex.Message}");
                return StatusCode(500, new { message = "Erro interno ao processar o arquivo." }); // Resposta como JSON
            }
        }
    }
}
