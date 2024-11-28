using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class EmpregoBeneficiario
{
    public int EmpregoID { get; set; }
    public string DescricaoEmprego { get; set; }
    public string TipoEmprego { get; set; }
    public decimal Salario { get; set; }
    public DateTime DataAdmissao { get; set; }
    public int BeneficiarioID { get; set; }
    public int EmpresaID { get; set; }
    public string Nome { get; set; }
    public string Telefone { get; set; }
    public string Email { get; set; }
    public string SegmentoMercado { get; set; }
    public string? ImagemPerfil { get; set; }
    public string Cnpj { get; set; }
    public bool Ativo { get; set; }

    public EmpregoBeneficiario() { }

}