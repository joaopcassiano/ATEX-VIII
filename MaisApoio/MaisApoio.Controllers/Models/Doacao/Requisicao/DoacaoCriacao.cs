using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class DoacaoCriacao
{
    public string DescricaoDoacao { get; set; }
    public decimal Quantidade { get; set; }
    public int BeneficiarioID { get; set; }
    public int DoadorID { get; set; }

    public DoacaoCriacao() {}

}