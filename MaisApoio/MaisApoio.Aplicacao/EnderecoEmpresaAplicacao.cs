using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using System.Data.Common;

namespace MaisApoio.Aplicacao;

public class EnderecoEmpresaAplicacao
{
    private EnderecoEmpresaRepositorio _enderecoEmpresaRepositorio;

    public EnderecoEmpresaAplicacao(EnderecoEmpresaRepositorio enderecoEmpresaRepositorio)
    {
        _enderecoEmpresaRepositorio = enderecoEmpresaRepositorio;
    }

    public async Task<int> CriarAsync(EnderecoEmpresa enderecoEmpresa)
    {
        if (enderecoEmpresa == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }

        return await _enderecoEmpresaRepositorio.CriarAsync(enderecoEmpresa);
    }

    public async Task<EnderecoEmpresa> ObterEnderecoAsync(int id)
    {
        var a = await _enderecoEmpresaRepositorio.ObterEnderecoAsync(id);

        if (a == null)
        {
            throw new Exception("Endereço não encontrado.");
        }
        return a;
    }

    public async Task<EnderecoEmpresa> ObterEnderecoPorEmpresaAsync(int id)
    {
        var a = await _enderecoEmpresaRepositorio.ObterEnderecoPorEmpresaAsync(id);
        
        if (a == null)
        {
            throw new Exception("Endereço não encontrado.");
        }
        return a;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        var endereco = await _enderecoEmpresaRepositorio.ObterEnderecoPorEmpresaAsync(id);

        if (endereco != null)
        {
            await _enderecoEmpresaRepositorio.ExclusaoFisicaAsync(endereco.ID);
        }
    }

    public async Task AtualizarAsync(EnderecoEmpresa enderecoEmpresa, int id)
    {
        if (enderecoEmpresa == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }
        if(string.IsNullOrWhiteSpace(enderecoEmpresa.Rua))
        {
            throw new Exception("A Rua não pode ser vazia.");
        }
        if(string.IsNullOrWhiteSpace(enderecoEmpresa.Cidade))
        {
            throw new Exception("A Cidade não pode ser vazia.");
        }
        if(string.IsNullOrWhiteSpace(enderecoEmpresa.Bairro))
        {
            throw new Exception("O Bairro não pode ser vazio.");
        }
        if(enderecoEmpresa.Numero < 0)
        {
            throw new Exception("O Número não pode ser vazio.");
        }
        if(string.IsNullOrWhiteSpace(enderecoEmpresa.Complemento))
        {
            throw new Exception("O Complemento não pode ser vazio.");
        }
        if(enderecoEmpresa.Cep.Length!= 8)
        {
            throw new Exception("O CEP deve ter 8 dígitos.");
        }
        if(string.IsNullOrWhiteSpace(enderecoEmpresa.Estado))
        {
            throw new Exception("O Estado não pode ser vazio.");
        }

        await _enderecoEmpresaRepositorio.AtualizarAsync(enderecoEmpresa, id);

    }

}