using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class EmpregoCriar
{
    public string DescricaoEmprego { get; set; }
    public string TipoEmprego { get; set; }
    public decimal Salario { get; set; }
    public int BeneficiarioID { get; set; }
    public int EmpresaID { get; set; }

    public EmpregoCriar() {}

}