using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.Aplicacao;

public class EnderecoAplicacao
{
    private EnderecoRepositorio _enderecoRepositorio;

    public EnderecoAplicacao(EnderecoRepositorio enderecoRepositorio)
    {
        _enderecoRepositorio = enderecoRepositorio;
    }

    public async Task<int> CriarAsync(Endereco endereco)
    {
        if(endereco == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }

        return await _enderecoRepositorio.CriarAsync(endereco);
    }

    public async Task<Endereco> ObterEnderecoAsync(int id)
    {
        return await _enderecoRepositorio.ObterEnderecoAsync(id);
        
    }

}