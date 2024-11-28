using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.MaisApoio.Controllers.Models.Necessidade.Respostas;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.MaisApoio.Aplicacao
{
    public class NecessidadeAplicacao
    {
        private NecessidadeRepositorio _necessidadeRepositorio;
        private BeneficiarioAplicacao _beneficiarioAplicacao;
        private VoluntarioAplicacao _voluntarioAplicacao;

        public NecessidadeAplicacao(NecessidadeRepositorio necessidadeRepositorio, BeneficiarioAplicacao beneficiarioAplicacao, VoluntarioAplicacao voluntarioAplicacao)
        {
            _necessidadeRepositorio = necessidadeRepositorio;
            _beneficiarioAplicacao = beneficiarioAplicacao;
            _voluntarioAplicacao = voluntarioAplicacao;
        }

        public async Task<int> CriarAsync(Necessidade necessidade)
        {
            if (necessidade == null)
            {
                throw new Exception("Necessidade não pode ser vazio");
            }

            Beneficiario beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(necessidade.BeneficiarioID);

            if (beneficiario == null)
            {
                throw new Exception("Beneficiário não encontrado!");
            }

            Voluntario voluntario = await _voluntarioAplicacao.ObterPorIdAsync(necessidade.VoluntarioID);

            if (voluntario == null)
            {
                throw new Exception("Voluntario não encontrado!");
            }

            return await _necessidadeRepositorio.CriarAsync(necessidade);

        }

        public async Task<List<NecessidadeBeneficiario>> ObterPorBeneficiarioAsync(int id)
        {
            Beneficiario beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(id);

            if (beneficiario == null)
            {
                throw new Exception("Beneficiário não encontrado!");
            }

            var lista = await _necessidadeRepositorio.ObterPorBeneficiarioAsync(id);

            if (lista == null || !lista.Any())
            {
                return new List<NecessidadeBeneficiario>();
            }

            List<NecessidadeBeneficiario> listaCompleta = (await Task.WhenAll(
                lista.Select(async item =>
                {
                    Voluntario voluntario = await _voluntarioAplicacao.ObterPorIdAsync(item.VoluntarioID);

                    if (voluntario == null)
                    {
                        return null;
                    }

                    return new NecessidadeBeneficiario
                    {
                        NecessidadeID = item.ID,
                        Descricao = item.Descricao,
                        DataRegistro = item.DataRegistro,
                        Prioridade = item.Prioridade,
                        VoluntarioID = voluntario.ID,
                        Nome = voluntario.Nome,
                        Telefone = voluntario.Telefone,
                        Email = voluntario.Email,
                        DataNascimento = voluntario.DataNascimento,
                        ImagemPerfil = voluntario?.ImagemPerfil,
                        Cpf = voluntario.CPF,
                        AreaAtuacao = voluntario.AreaAtuacao,
                        Ativo = voluntario.Ativo,
                    };
                })
            ))
            .Where(x => x != null)
            .ToList();

            return listaCompleta;
        }


        public async Task<List<NecessidadeVoluntario>> ObterPorVoluntarioAsync(int id)
        {
            List<NecessidadeVoluntario> lista = await _necessidadeRepositorio.ObterPorVoluntarioAsync(id);

            return lista;
        }

    }
}
