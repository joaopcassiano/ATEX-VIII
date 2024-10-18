namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Emprego
{
    private int _id;
    private string _tituloVaga;
    private string _descricaoVaga;
    private double _salario;
    private string _localizacao;
    private int _beneficiarioID;
    private int _ativoEmprego;

    public int ID { get => _id; set => _id = value; }

    public string TituloVaga { get => _tituloVaga; set => _tituloVaga = value; }

    public string DescricaoVaga { get => _descricaoVaga; set => _descricaoVaga = value; }

    public double Salario { get => _salario; set => _salario = value; }

    public string Localizacao { get => _localizacao; set => _localizacao = value; }

    public int BeneficiarioID { get => _beneficiarioID; set => _beneficiarioID = value; }

    public int AtivoEmprego { get => _ativoEmprego; set => _ativoEmprego = value; }

    public Emprego(){}

    public Emprego(int id, string tituloVaga, string descricaoVaga, double salario, string localizacao, int beneficiarioID, int ativoEmprego)
    {
        Id = id;
        TituloVaga = tituloVaga;
        DescricaoVaga = descricaoVaga;
        Salario = salario;
        Localizacao = localizacao;
        BeneficiarioID = beneficiarioID;
        AtivoEmprego = true;
    }

    public void Deletar()
    {
        AtivoEmprego = false;
    }
    public void Restaurarr()
    {
        AtivoEmprego = true;
    }


}