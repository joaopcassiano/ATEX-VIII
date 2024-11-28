using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using MaisApoio.Models.Doador.Requisicao;

namespace MaisApoio.Aplicacao;

public class EmpregoAplicacao
{
    private EmpregoRepositorio _empregoRepositorio;
    private BeneficiarioAplicacao _beneficiarioAplicacao;
    private EmpresaAplicacao _empresaAplicacao;

    public EmpregoAplicacao(EmpregoRepositorio empregoRepositorio, BeneficiarioAplicacao beneficiarioAplicacao, EmpresaAplicacao empresaAplicacao)
    {
        _empregoRepositorio = empregoRepositorio;
        _beneficiarioAplicacao = beneficiarioAplicacao;
        _empresaAplicacao = empresaAplicacao;
    }

    public async Task<int> CriarAsync(Emprego emprego)
    {
        if (emprego == null)
        {
            throw new Exception("Emprego não pode ser vazio");
        }

        Beneficiario beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(emprego.BeneficiarioID);

        if (beneficiario == null)
        {
            throw new Exception("Beneficiário não encontrado!");
        }

        Empresa empresa = await _empresaAplicacao.ObterPorIdAsync(emprego.EmpresaID);

        if (empresa == null)
        {
            throw new Exception("Empresa não encontrado!");
        }

        return await _empregoRepositorio.CriarAsync(emprego);

    }

    public async Task<List<EmpregoBeneficiario>> ObterPorBeneficiarioAsync(int id)
    {
        Beneficiario beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(id);

        if (beneficiario == null)
        {
            throw new Exception("Beneficiário não encontrado!");
        }

        var lista = await _empregoRepositorio.ObterPorBeneficiarioAsync(id);

        if (lista == null)
        {
            return null;
        }

        List<EmpregoBeneficiario> listaCompleta = (await Task.WhenAll(
    lista.Select(async item =>
    {
        Empresa empresa = await _empresaAplicacao.ObterPorIdAsync(item.EmpresaID);

        if(empresa == null){
            return null;
        }
        else
        {
        return new EmpregoBeneficiario
        {
            EmpregoID = item.ID,
            DescricaoEmprego = item.DescricaoEmprego,
            TipoEmprego = item.TipoEmprego,
            Salario = item.Salario,
            DataAdmissao = item.DataAdmissao,
            BeneficiarioID = item.BeneficiarioID,
            EmpresaID = item.EmpresaID,
            Nome = empresa.Nome,
            Telefone = empresa.Telefone,
            Email = empresa.Email,
            SegmentoMercado = empresa.SegmentoMercado,
            ImagemPerfil = empresa?.ImagemPerfil,
            Cnpj = empresa.CNPJ,
            Ativo = empresa.Ativo,
        };
        
        }
    })
))
.Where(emprego => emprego != null)
.ToList();

return listaCompleta;

    }

    public async Task<List<EmpregoEmpresa>> ObterPorDoadorAsync(int id)
    {
        List<EmpregoEmpresa> lista = await _empregoRepositorio.ObterPorEmpresaAsync(id);

        return lista;
    }

}