using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.MaisApoio.Aplicacao
{
    public class VoluntarioAplicacao
    {
        private VoluntarioRepositorio _voluntarioRepositorio;

        public VoluntarioAplicacao(VoluntarioRepositorio voluntarioRepositorio)
        {
            _voluntarioRepositorio = voluntarioRepositorio;
        }

        public async Task<int> CriarAsync(Voluntario voluntario)
        {

            if (voluntario == null)
            {
                throw new Exception("Voluntario não pode ser vazio");
            }

            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorEmailAsync(voluntario.Email);

            if (voluntarioObtido != null)
            {
                throw new Exception("Já existe um voluntario com o mesmo email.");
            }

            return await _voluntarioRepositorio.CriarAsync(voluntario);

        }

        public async Task AtualizarAsync(Voluntario voluntario)
        {
            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorIdAsync(voluntario.ID);

            if (voluntario == null)
            {
                throw new Exception("Voluntario não encontrado.");
            }

            voluntarioObtido.Nome = voluntario.Nome;
            voluntarioObtido.CPF = voluntario.CPF;
            voluntarioObtido.Telefone = voluntario.Telefone;
            voluntarioObtido.Ativo = voluntario.Ativo;
            voluntarioObtido.DataNascimento = voluntario.DataNascimento;

            await _voluntarioRepositorio.AtualizarAsync(voluntarioObtido);
        }

        public async Task ExcluirAsync(int id)
        {
            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorIdAsync(id);

            if (voluntarioObtido == null)
            {
                throw new Exception("Voluntario não encontrado.");
            }

            voluntarioObtido.Deletar();

            await _voluntarioRepositorio.AtualizarAsync(voluntarioObtido);
        }

        public async Task RestaurarAsync(int id)
        {
            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorIdAsync(id);

            if (voluntarioObtido == null)
            {
                throw new Exception("Voluntario não encontrado.");
            }

            voluntarioObtido.Restaurar();

            await _voluntarioRepositorio.AtualizarAsync(voluntarioObtido);
        }

        public async Task<List<Voluntario>> ObterTodosAsync()
        {
            return await _voluntarioRepositorio.ObterTodosAsync();
        }

        public async Task<Voluntario> ObterPorEmailAsync(string email)
        {
            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorEmailAsync(email);

            if (voluntarioObtido == null)
            {
                throw new Exception("Voluntario não encontrado.");
            }

            return voluntarioObtido;
        }

        public async Task<Voluntario> ObterPorIdAsync(int id)
        {
            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorIdAsync(id);

            if (voluntarioObtido == null)
            {
                throw new Exception("Voluntario não encontrado.");
            }

            return voluntarioObtido;
        }

        public async Task CarregarImagemAsync(string imagem, int id)
        {

            if (imagem == null)
            {
                throw new Exception("Imagem não pode ser vazia.");
            }

            var voluntarioID = await _voluntarioRepositorio.ObterPorIdAsync(id);

            if (voluntarioID == null)
            {
                throw new Exception("Voluntario não encontrado.");
            }
            
            await _voluntarioRepositorio.CarregarImagemAsync(imagem, id);
        }

        public async Task ExclusaoFisicaAsync(int id)
        {
            await _voluntarioRepositorio.ExclusaoFisicaAsync(id);
        }

        public async Task<int> LogarAsync(string email, string senha)
        {
            Voluntario voluntarioObtido = await _voluntarioRepositorio.ObterPorEmailAsync(email);

            if (voluntarioObtido == null)
            {
                throw new Exception("Email não cadastrado");
            }

            Voluntario voluntario = await _voluntarioRepositorio.LogarAsync(email, senha);

            if (voluntario == null)
            {
                throw new Exception("Senha incorreta");
            }

            return voluntario.ID;
        }

        public async Task TrocarDeSenhaAsync(int id, string confirmarSenha, string senha)
        {
            var voluntario = await _voluntarioRepositorio.ObterPorIdAsync(id);

            if (voluntario == null)
            {
                throw new Exception("Voluntario não encontrado");
            }

            if (confirmarSenha != senha)
            {
                throw new Exception("As senhas passadas não são iguais");
            }

            if (string.IsNullOrWhiteSpace(senha))
            {
                throw new Exception("Senha não pode ser vazia");
            }

            voluntario.Senha = senha;

            await _voluntarioRepositorio.AtualizarAsync(voluntario);
        }


    }
}
