using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.MaisApoio.Controllers.Models.Necessidade.Requisicao;
using MaisApoio.MaisApoio.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;

namespace MaisApoio.MaisApoio.Controllers.Controllers
{
    [ApiController]
    [Route("[controller]/api")]
    public class NecessidadeController : ControllerBase
    {
        private NecessidadeAplicacao _necessidadeAplicacao;

        public NecessidadeController(NecessidadeAplicacao necessidadeAplicacao)
        {
            _necessidadeAplicacao = necessidadeAplicacao;
        }

        [HttpPost]
        [Route("criar")]
        public async Task<IActionResult> CriarAsync([FromBody] NecessidadeCriacao necessidade)
        {
            try
            {
                var id = await _necessidadeAplicacao.CriarAsync(new Necessidade
                {
                    Descricao = necessidade.Descricao,
                    DataRegistro = DateTime.Now,
                    Prioridade = necessidade.Prioridade,
                    BeneficiarioID = necessidade.BeneficiarioID,
                    VoluntarioID = necessidade.VoluntarioID
                });
                return Ok(id);

            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }
        }


        [HttpGet]
        [Route("obter-por-beneficiario/{id}")]
        public async Task<IActionResult> ObterPorBeneficiarioAsync([FromRoute] int id)
        {
            try
            {
                var doacao = await _necessidadeAplicacao.ObterPorBeneficiarioAsync(id);

                return Ok(doacao);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet]
        [Route("obter-por-voluntario/{id}")]
        public async Task<IActionResult> ObterPorVoluntarioAsync([FromRoute] int id)
        {
            try
            {
                var doacao = await _necessidadeAplicacao.ObterPorVoluntarioAsync(id);

                return Ok(doacao);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}
