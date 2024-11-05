using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Aplicacao;
using Microsoft.AspNetCore.Mvc;

namespace MaisApoio.MaisApoio.Controllers.Controllers
{
    [ApiController]
    [Route("[controller]/api")]
    public class Encrypt
    {
        [HttpPost("decrypt")]
        public string DecryptData(string input)
        {
            return CryptoDataService.Decrypt(input);
        }
        [HttpPost("decrypt-list-data")]
        public List<string> DecryptListData(List<string> input)
        {
            return CryptoDataService.DecryptListData(input);
        }

        [HttpPost("encrypt")]
        public string EncryptData(string input)
        {
            return CryptoDataService.Encrypt(input);
        }
        [HttpPost("encrypt-list-data")]
        public List<string> EncryptListData(List<string> input)
        {
            return CryptoDataService.EncryptListData(input);
        }
    }
}
