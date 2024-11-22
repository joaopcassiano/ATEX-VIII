using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using MaisApoio.MaisApoio.Dominio.Entidades;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class BeneficiarioLogado
{
    public int _id { get; set; }
    public string _nome { get; set; }
    public string _cpf { get; set; }
    public string _telefone { get; set; }
    public DateTime _dataNascimento { get; set; }
    public string _necessidade { get; set; }
    public decimal _situacaoEconomica { get; set; }
    public string _email { get; set; }
    public string? _imagemPerfil { get; set; }
    public bool _ativo { get; set; }

    public BeneficiarioLogado() {}
    public BeneficiarioLogado(Beneficiario beneficiario)
    {
        _id = beneficiario.ID;
        _nome = beneficiario.Nome;
        _cpf = beneficiario.CPF;
        _telefone = beneficiario.Telefone;
        _dataNascimento = beneficiario.DataNascimento;
        _necessidade = beneficiario.Necessidade;
        _situacaoEconomica = beneficiario.SituacaoEconomica;
        _email = beneficiario.Email;
        _imagemPerfil = beneficiario.ImagemPerfil;
        _ativo = beneficiario.Ativo;
    }

}