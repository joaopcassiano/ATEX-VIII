using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class DoacaoBeneficiario
{
    public int DoacaoID { get; set; }
    public string DescricaoDoacao { get; set; }
    public decimal Quantidade { get; set; }
    public DateTime DataDoacao { get; set; }
    public int BeneficiarioID { get; set; }
    public int DoadorID { get; set; }
    public string Nome{ get; set; }
    public string Telefone{ get; set; }
    public string Email{ get; set; }
    public DateTime DataNascimento{ get; set; }
    public string? ImagemPerfil{ get; set; }
    public string Cpf{ get; set; }
    public bool Ativo{ get; set; }

    public DoacaoBeneficiario() {}

}