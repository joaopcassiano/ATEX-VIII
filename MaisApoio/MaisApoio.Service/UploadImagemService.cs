using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using MaisApoio.MaisApoio.Dominio.Entidades;

namespace MaisApoio.Service;
public class UploadimagemService
{
    private readonly HttpClient _httpClient;
    private const string GitHubApiBaseUrl = "https://api.github.com";
    private const string Owner = "AndersonCaproni";
    private const string Repo = "FotosPerfil";
    private const string Branch = "main";
    private const string Token = "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";

    public UploadimagemService()
    {
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("NomeDaAplicacao", "1.0"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", Token);
    }

    public async Task<string> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new Exception("Nenhuma imagem foi enviada.");

        using (var stream = file.OpenReadStream())
        {
            var fileBytes = new byte[file.Length];
            await stream.ReadAsync(fileBytes, 0, (int)file.Length);
            var base64Content = Convert.ToBase64String(fileBytes);
            var fileName = file.FileName;

            string randon = new Random().Next(1000, 100000).ToString();
            string data = DateTime.Now.ToString();
            string guid = Guid.NewGuid().ToString();
            var gitHubPath = $"images/{guid}_{data}_{randon}-{fileName}";

            var url = $"{GitHubApiBaseUrl}/repos/{Owner}/{Repo}/contents/{gitHubPath}";

            var payload = new
            {
                message = $"Upload de imagem {fileName}",
                content = base64Content,
                branch = Branch
            };

            var response = await _httpClient.PutAsJsonAsync(url, payload);

            if (response.IsSuccessStatusCode)
            {

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var gitHubResponse = JsonConvert.DeserializeObject<GitHubResponse>(jsonResponse);

                if (gitHubResponse?.content?.download_url != null)
                {
                    return gitHubResponse.content.download_url;
                }

                throw new Exception("Erro ao obter a URL do arquivo.");
            }
            else
            {
                var errorResponse = await response.Content.ReadAsStringAsync();
                throw new Exception(errorResponse);
            }
        }
    }

}