using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.Aplicacao;

public class BeneficiarioAplicacao
{
    private BeneficiarioRepositorio _beneficiarioRepositorio;

    public BeneficiarioAplicacao(BeneficiarioRepositorio beneficiarioRepositorio)
    {
        _beneficiarioRepositorio = beneficiarioRepositorio;
    }

    public async Task CriarAsync(Beneficiario beneficiario)
    {

        if (beneficiario == null)
        {
            throw new Exception("Beneficiario não pode ser vazio");
        }

        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorEmailAsync(beneficiario.Email);

        if (beneficiarioObtido != null)
        {
            throw new Exception("Já existe um beneficiario com o mesmo email.");
        }

        await _beneficiarioRepositorio.CriarAsync(beneficiario);

    }

    public async Task AtualizarAsync(Beneficiario beneficiario)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorIdAsync(beneficiario.ID);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        if (beneficiario.Nome == null)
        {
            throw new Exception("Nome do beneficiario não pode ser vazio.");
        }

        beneficiarioObtido.Nome = beneficiario.Nome;
        beneficiarioObtido.CPF = beneficiario.CPF;
        beneficiarioObtido.Telefone = beneficiario.Telefone;
        beneficiarioObtido.Ativo = beneficiario.Ativo;
        beneficiarioObtido.SituacaoEconomica = beneficiario.SituacaoEconomica;
        beneficiarioObtido.DataNascimento = beneficiario.DataNascimento;

        await _beneficiarioRepositorio.AtualizarAsync(beneficiarioObtido);
    }

    public async Task ExcluirAsync(int id)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorIdAsync(id);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        beneficiarioObtido.Deletar();

        await _beneficiarioRepositorio.AtualizarAsync(beneficiarioObtido);
    }

    public async Task RestaurarAsync(int id)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorIdAsync(id);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        beneficiarioObtido.Restaurar();

        await _beneficiarioRepositorio.AtualizarAsync(beneficiarioObtido);
    }

    public async Task<List<Beneficiario>> ObterTodosAsync()
    {
        return await _beneficiarioRepositorio.ObterTodosAsync();
    }

    public async Task<Beneficiario> ObterPorEmailAsync(string email)
    {
        Beneficiario beneficiarioObtido =  await _beneficiarioRepositorio.ObterPorEmailAsync(email);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        return beneficiarioObtido;
    }

    public async Task<Beneficiario> ObterPorIdAsync(int id)
    {
        Beneficiario beneficiarioObtido =  await _beneficiarioRepositorio.ObterPorIdAsync(id);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        return beneficiarioObtido;
    }

    public async Task CarregarImagemAsync(IFormFile file, int id)
    {
        await _beneficiarioRepositorio.CarregarImagemAsync(file, id);
    }

    public async Task<int> LogarAsync(string email, string senha)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorEmailAsync(email);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Email não cadastrado");
        }

        Beneficiario beneficiario = await _beneficiarioRepositorio.LogarAsync(email,senha);

        if(beneficiario == null)
        {
            throw new Exception("Senha incorreta");
        }

        return beneficiario.ID;
    }

}