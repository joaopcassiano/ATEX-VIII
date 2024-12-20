using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using System.Data.Common;

namespace MaisApoio.Aplicacao;

public class EnderecoBeneficiarioAplicacao
{
    private EnderecoBeneficiarioRepositorio _enderecoBeneficiarioRepositorio;

    public EnderecoBeneficiarioAplicacao(EnderecoBeneficiarioRepositorio enderecoBeneficiarioRepositorio)
    {
        _enderecoBeneficiarioRepositorio = enderecoBeneficiarioRepositorio;
    }

    public async Task<int> CriarAsync(EnderecoBeneficiario enderecoBeneficiario)
    {
        if (enderecoBeneficiario == null)
        {
            throw new Exception("O endereço não pode ser vazio");
        }

        return await _enderecoBeneficiarioRepositorio.CriarAsync(enderecoBeneficiario);
    }

    public async Task<EnderecoBeneficiario> ObterEnderecoAsync(int id)
    {
        var a = await _enderecoBeneficiarioRepositorio.ObterEnderecoAsync(id);

        if (a == null)
        {
            throw new Exception("Endereço não encontrado.");
        }
        return a;
    }

    public async Task<EnderecoBeneficiario> ObterEnderecoPorBeneficiarioAsync(int id)
    {
        var a = await _enderecoBeneficiarioRepositorio.ObterEnderecoPorBeneficiarioAsync(id);
        
        if (a == null)
        {
            throw new Exception("Endereço não encontrado.");
        }
        return a;
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        var endereco = await _enderecoBeneficiarioRepositorio.ObterEnderecoPorBeneficiarioAsync(id);

        if (endereco != null)
        {
            await _enderecoBeneficiarioRepositorio.ExclusaoFisicaAsync(endereco.ID);
        }
    }

}