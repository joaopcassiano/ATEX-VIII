using MaisApoio.MaisApoio.Controllers.Models;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using MaisApoio.Models.Doador.Requisicao;

namespace MaisApoio.Aplicacao;

public class DoacaoAplicacao
{
    private DoacaoRepositorio _doacaoRepositorio;
    private BeneficiarioAplicacao _beneficiarioAplicacao;
    private DoadorAplicacao _doadorAplicacao;

    public DoacaoAplicacao(DoacaoRepositorio doacaoRepositorio, BeneficiarioAplicacao beneficiarioAplicacao, DoadorAplicacao doadorAplicacao)
    {
        _doacaoRepositorio = doacaoRepositorio;
        _beneficiarioAplicacao = beneficiarioAplicacao;
        _doadorAplicacao = doadorAplicacao;
    }

    public async Task<int> CriarAsync(Doacao doacao)
    {
        if (doacao == null)
        {
            throw new Exception("Doacao não pode ser vazio");
        }

        Beneficiario beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(doacao.BeneficiarioID);

        if (beneficiario == null)
        {
            throw new Exception("Beneficiário não encontrado!");
        }

        Doador doador = await _doadorAplicacao.ObterPorIdAsync(doacao.DoadorID);

        if (doador == null)
        {
            throw new Exception("Doador não encontrado!");
        }

        return await _doacaoRepositorio.CriarAsync(doacao);

    }

    public async Task<List<DoacaoBeneficiario>> ObterPorBeneficiarioAsync(int id)
    {
        Beneficiario beneficiario = await _beneficiarioAplicacao.ObterPorIdAsync(id);

        if (beneficiario == null)
        {
            throw new Exception("Beneficiário não encontrado!");
        }

        var lista = await _doacaoRepositorio.ObterPorBeneficiarioAsync(id);

        if (lista == null)
        {
            return null;
        }

        List<DoacaoBeneficiario> listaCompleta = (await Task.WhenAll(
        lista.Select(async item =>
        {
            Doador doador = await _doadorAplicacao.ObterPorIdAsync(item.DoadorID);

            if(doador == null){
                return null;
            }
            else
            {
            return new DoacaoBeneficiario
            {
                DoacaoID = item.ID,
                DescricaoDoacao = item.DescricaoDoacao,
                Quantidade = item.Quantidade,
                DataDoacao = item.DataDoacao,
                BeneficiarioID = item.BeneficiarioID,
                DoadorID = item.DoadorID,
                Nome = doador.Nome,
                Telefone = doador.Telefone,
                Email = doador.Email,
                DataNascimento = doador.DataNascimento,
                ImagemPerfil = doador?.ImagemPerfil,
                Cpf = doador.CPF,
                Ativo = doador.Ativo,
            };
        
            }
        })
        ))
        .Where(doacao => doacao != null)
        .ToList();

        return listaCompleta;

    }

    public async Task<List<DoacaoDoador>> ObterPorDoadorAsync(int id)
    {
        List<DoacaoDoador> lista = await _doacaoRepositorio.ObterPorDoadorAsync(id);

        return lista;
    }

}