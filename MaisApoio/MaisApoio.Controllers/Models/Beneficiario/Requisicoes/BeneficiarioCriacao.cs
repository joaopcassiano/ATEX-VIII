namespace MaisApoio.Models.Beneficiario.Requisicao;

public class BeneficiarioCriacao
{
    public string Nome { get; set; }
    public string Cpf { get; set; }
    public string Telefone { get; set; }
    public DateTime DataNascimento { get; set; }
    public decimal SituacaoEconomica { get; set; }
    public string Necessidade { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public string Rua { get; set; }
    public string Bairro { get; set; }
    public int Numero { get; set; }
    public string Complemento { get; set; }
    public string Cidade { get; set; }
    public string Estado { get; set; }
    public string Cep { get; set; }

    public BeneficiarioCriacao() { }

}
