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
        if(enderecoEmpresa == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }

        return await _enderecoEmpresaRepositorio.CriarAsync(enderecoEmpresa);
    }

    public async Task<EnderecoEmpresa> ObterEnderecoAsync(int id)
    {
        return await _enderecoEmpresaRepositorio.ObterEnderecoAsync(id);
        
    }

    public async Task<EnderecoEmpresa> ObterEnderecoPorEmpresaAsync(int id)
    {
        return await _enderecoEmpresaRepositorio.ObterEnderecoPorEmpresaAsync(id);
        
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        var endereco = await _enderecoEmpresaRepositorio.ObterEnderecoPorEmpresaAsync(id);

        if (endereco != null)
        {
            await _enderecoEmpresaRepositorio.ExclusaoFisicaAsync(endereco.ID);
        }
    }

}