using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using MaisApoio.MaisApoio.Dominio.Entidades;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class BeneficiarioLogado
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Cpf { get; set; }
    public string Telefone { get; set; }
    public DateTime DataNascimento { get; set; }
    public string Necessidade { get; set; }
    public decimal SituacaoEconomica { get; set; }
    public string Email { get; set; }
    public string? ImagemPerfil { get; set; }
    public bool Ativo { get; set; }

    public BeneficiarioLogado() {}
    public BeneficiarioLogado(Beneficiario beneficiario)
    {
        Id = beneficiario.ID;
        Nome = beneficiario.Nome;
        Cpf = beneficiario.CPF;
        Telefone = beneficiario.Telefone;
        DataNascimento = beneficiario.DataNascimento;
        Necessidade = beneficiario.Necessidade;
        SituacaoEconomica = beneficiario.SituacaoEconomica;
        Email = beneficiario.Email;
        ImagemPerfil = beneficiario.ImagemPerfil;
        Ativo = beneficiario.Ativo;
    }

}