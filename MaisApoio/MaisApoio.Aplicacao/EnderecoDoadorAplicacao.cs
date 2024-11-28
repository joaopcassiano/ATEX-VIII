using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using System.Data.Common;

namespace MaisApoio.Aplicacao;

public class EnderecoDoadorAplicacao
{
    private EnderecoDoadorRepositorio _enderecoDoadorRepositorio;

    public EnderecoDoadorAplicacao(EnderecoDoadorRepositorio enderecoDoadorRepositorio)
    {
        _enderecoDoadorRepositorio = enderecoDoadorRepositorio;
    }

    public async Task<int> CriarAsync(EnderecoDoador enderecoDoador)
    {
        if (enderecoDoador == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }

        return await _enderecoDoadorRepositorio.CriarAsync(enderecoDoador);
    }

    public async Task<EnderecoDoador> ObterEnderecoAsync(int id)
    {
        var a = await _enderecoDoadorRepositorio.ObterEnderecoAsync(id);

        if (a == null)
        {
            throw new Exception("Endereço não encontrado.");
        }
        return a;
    }

    public async Task<EnderecoDoador> ObterEnderecoPorDoadorAsync(int id)
    {
        var a = await _enderecoDoadorRepositorio.ObterEnderecoPorDoadorAsync(id);
        
        if (a == null)
        {
            throw new Exception("Endereço não encontrado.");
        }
        return a;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        var endereco = await _enderecoDoadorRepositorio.ObterEnderecoPorDoadorAsync(id);

        if (endereco != null)
        {
            await _enderecoDoadorRepositorio.ExclusaoFisicaAsync(endereco.ID);
        }
    }

    public async Task AtualizarAsync(EnderecoDoador enderecoDoador, int id)
    {
        if (enderecoDoador == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }
        if(string.IsNullOrWhiteSpace(enderecoDoador.Rua))
        {
            throw new Exception("A Rua não pode ser vazia.");
        }
        if(string.IsNullOrWhiteSpace(enderecoDoador.Cidade))
        {
            throw new Exception("A Cidade não pode ser vazia.");
        }
        if(string.IsNullOrWhiteSpace(enderecoDoador.Bairro))
        {
            throw new Exception("O Bairro não pode ser vazio.");
        }
        if(enderecoDoador.Numero < 0)
        {
            throw new Exception("O Número não pode ser vazio.");
        }
        if(string.IsNullOrWhiteSpace(enderecoDoador.Complemento))
        {
            throw new Exception("O Complemento não pode ser vazio.");
        }
        if(enderecoDoador.Cep.Length!= 8)
        {
            throw new Exception("O CEP deve ter 8 dígitos.");
        }
        if(string.IsNullOrWhiteSpace(enderecoDoador.Estado))
        {
            throw new Exception("O Estado não pode ser vazio.");
        }

        await _enderecoDoadorRepositorio.AtualizarAsync(enderecoDoador, id);

    }

}