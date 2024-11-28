using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class EmpregoEmpresa
{
    public int EmpregoID { get; set; }
    public string DescricaoEmprego { get; set; }
    public string TipoEmprego { get; set; }
    public decimal Salario { get; set; }
    public DateTime DataAdmissao { get; set; }
    public int BeneficiarioID { get; set; }
    public int EmpresaID { get; set; }
    public string Nome{ get; set; }
    public string Telefone{ get; set; }
    public string Email{ get; set; }
    public DateTime DataNascimento{ get; set; }
    public string? ImagemPerfil{ get; set; }
    public string Cpf{ get; set; }
    public string Necessidade{ get; set; }
    public string SituacaoEconomica{ get; set; }
    public bool Ativo{ get; set; }

    public EmpregoEmpresa() {}

}