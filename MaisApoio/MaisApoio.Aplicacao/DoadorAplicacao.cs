using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.Aplicacao;

public class DoadorAplicacao
{
    private DoadorRepositorio _doadorRepositorio;

    public DoadorAplicacao(DoadorRepositorio doadorRepositorio)
    {
        _doadorRepositorio = doadorRepositorio;
    }

    public async Task<int> CriarAsync(Doador doador)
    {

        if (doador == null)
        {
            throw new Exception("Doador não pode ser vazio");
        }

        Doador doadorObtido = await _doadorRepositorio.ObterPorEmailAsync(doador.Email);

        if (doador != null)
        {
            throw new Exception("Já existe um doador com o mesmo email.");
        }

        return await _doadorRepositorio.CriarAsync(doador);

    }

    public async Task AtualizarAsync(Doador doador)
    {
        Doador doadorObtido = await _doadorRepositorio.ObterPorIdAsync(doador.ID);

        if (doador == null)
        {
            throw new Exception("Doador não encontrado.");
        }

        doadorObtido.Nome = doador.Nome;
        doadorObtido.CPF = doador.CPF;
        doadorObtido.Telefone = doador.Telefone;
        doadorObtido.Ativo = doador.Ativo;
        doadorObtido.DataNascimento = doador.DataNascimento;

        await _doadorRepositorio.AtualizarAsync(doadorObtido);
    }

    public async Task ExcluirAsync(int id)
    {
        Doador doadorObtido = await _doadorRepositorio.ObterPorIdAsync(id);

        if (doadorObtido == null)
        {
            throw new Exception("Doador não encontrado.");
        }

        doadorObtido.Deletar();

        await _doadorRepositorio.AtualizarAsync(doadorObtido);
    }

    public async Task RestaurarAsync(int id)
    {
        Doador doadorObtido = await _doadorRepositorio.ObterPorIdAsync(id);

        if (doadorObtido == null)
        {
            throw new Exception("Doador não encontrado.");
        }

        doadorObtido.Restaurar();

        await _doadorRepositorio.AtualizarAsync(doadorObtido);
    }

    public async Task<List<Doador>> ObterTodosAsync()
    {
        return await _doadorRepositorio.ObterTodosAsync();
    }

    public async Task<Doador> ObterPorEmailAsync(string email)
    {
        Doador doadorObtido = await _doadorRepositorio.ObterPorEmailAsync(email);

        if (doadorObtido == null)
        {
            throw new Exception("Doador não encontrado.");
        }

        return doadorObtido;
    }

    public async Task<Doador> ObterPorIdAsync(int id)
    {
        Doador doadorObtido = await _doadorRepositorio.ObterPorIdAsync(id);

        if (doadorObtido == null)
        {
            throw new Exception("Doador não encontrado.");
        }

        return doadorObtido;
    }

    public async Task CarregarImagemAsync(string imagem, int id)
    {
        await _doadorRepositorio.CarregarImagemAsync(imagem, id);
    }

    public async Task ExclusaoFisicaAsync(int id){
        await _doadorRepositorio.ExclusaoFisicaAsync(id);
    }
    
    public async Task<int> LogarAsync(string email, string senha)
    {
        Doador doadorObtido = await _doadorRepositorio.ObterPorEmailAsync(email);

        if (doadorObtido == null)
        {
            throw new Exception("Email não cadastrado");
        }

        Doador doador = await _doadorRepositorio.LogarAsync(email, senha);

        if (doador == null)
        {
            throw new Exception("Senha incorreta");
        }

        return doador.ID;
    }

}