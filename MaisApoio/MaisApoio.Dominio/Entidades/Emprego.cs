namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Emprego
{
    private int _id;
    private string _tipoEmprego;
    private string _descricaoEmprego;
    private decimal _salario;
    private int _empresaID;
    private int _beneficiarioID;
    private DateTime _dataAdmissao;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }

    public DateTime DataAdmissao
    {
        get { return _dataAdmissao; }
        set { _dataAdmissao = value; }
    }

    public string TipoEmprego
    {
        get { return _tipoEmprego; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("o tipo do emprego não pode ser vazio.");

            _tipoEmprego = value;
        }
    }

    public string DescricaoEmprego 
    {
        get { return _descricaoEmprego; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricaoEmprego = value;
        }
    }

    public decimal Salario
    {
        get { return _salario; }
        set
        {
            if(value <= 0)
                throw new Exception("O Salário não pode ser zero ou negativo.");
                
            _salario = value;
        }
    }

    public int EmpresaID
    {
        get { return _empresaID; }
        set
        {
            if (value <= 0)
                throw new Exception("Empresa inválida.");

            _empresaID = value;
        }
    }

    public int BeneficiarioID
    {
        get { return _beneficiarioID; }
        set 
        {
            if(value <= 0)
                throw new Exception("O ID do Beneficiário não estar vazio ou zerado.");
                
            _beneficiarioID = value;
        }
    }

    public bool Ativo 
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Emprego() { }

    public Emprego(string tipoEmprego, string descricaoEmprego, decimal salario, int empresaID, int beneficiarioID)
    {
        TipoEmprego = tipoEmprego;
        DescricaoEmprego = descricaoEmprego;
        Salario = salario;
        EmpresaID = empresaID;
        BeneficiarioID = beneficiarioID;
        Ativo = true;
        DataAdmissao = DateTime.Now;
    }

    public void Deletar()
    {
        Ativo = false;
    }
    public void Restaurarr()
    {
        Ativo = true;
    }

}