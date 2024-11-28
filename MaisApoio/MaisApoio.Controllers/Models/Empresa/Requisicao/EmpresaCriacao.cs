namespace MaisApoio.Models.Empresa.Requisicao;

public class EmpresaCriacao
{
    public string Nome { get; set; }
    public string Cnpj { get; set; }
    public string Telefone { get; set; }
    public string SegmentoMercado { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public string Rua { get; set; }
    public string Bairro { get; set; }
    public int Numero { get; set; }
    public string Complemento { get; set; }
    public string Cidade { get; set; }
    public string Estado { get; set; }
    public string Cep { get; set; }

    public EmpresaCriacao()
    {
        
    }
}