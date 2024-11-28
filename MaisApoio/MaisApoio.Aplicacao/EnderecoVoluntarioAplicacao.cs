using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.MaisApoio.Aplicacao
{
    public class EnderecoVoluntarioAplicacao
    {
        private EnderecoVoluntarioRepositorio _enderecoVoluntarioRepositorio;

        public EnderecoVoluntarioAplicacao(EnderecoVoluntarioRepositorio enderecoVoluntarioRepositorio)
        {
            _enderecoVoluntarioRepositorio = enderecoVoluntarioRepositorio;
        }

        public async Task<int> CriarAsync(EnderecoVoluntario enderecoVoluntario)
        {
            if (enderecoVoluntario == null)
            {
                throw new Exception("O endereço não pode ser vazio");
            }

            return await _enderecoVoluntarioRepositorio.CriarAsync(enderecoVoluntario);
        }

        public async Task<EnderecoVoluntario> ObterEnderecoAsync(int id)
        {
            var a = await _enderecoVoluntarioRepositorio.ObterEnderecoAsync(id);

            if (a == null)
            {
                throw new Exception("Endereço não encontrado.");
            }
            return a;
        }

        public async Task<EnderecoVoluntario> ObterEnderecoPorVoluntarioAsync(int id)
        {
            var a = await _enderecoVoluntarioRepositorio.ObterEnderecoPorVoluntarioAsync(id);

            if (a == null)
            {
                throw new Exception("Endereço não encontrado.");
            }
            return a;
        }

        public async Task ExclusaoFisicaAsync(int id)
        {
            var endereco = await _enderecoVoluntarioRepositorio.ObterEnderecoPorVoluntarioAsync(id);

            if (endereco != null)
            {
                await _enderecoVoluntarioRepositorio.ExclusaoFisicaAsync(endereco.ID);
            }
        }

    }
}
