<<<<<<< HEAD
namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Necessidade
{

    private int _id;
    private string _descricao;
    private DateTime _dataRegistro;
    private string _prioridade;
    private int _beneficiarioID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }
    public string Descricao
    {
        get { return _descricao; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricao = value;
        }
    }
    public DateTime DataRegistro
    {
        get { return _dataRegistro; }
        set { _dataRegistro = value; }
    }
    public string Prioridade
    {
        get { return _prioridade; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Prioridade não pode ser vaia.");

            _prioridade = value;
        }
    }
    public int BeneficiarioID
    {
        get { return _beneficiarioID; }
        set 
        {
            if(value <= 0)
                throw new Exception("O ID do Beneficiário não pode ser zero ou negativo.");
                
            _beneficiarioID = value;
        }
    }
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }
    public Necessidade() { }

    public Necessidade(string descricao, DateTime dataRegistro, string prioridade, int beneficarioID)
    {
        Descricao = descricao;
        DataRegistro = dataRegistro;
        Prioridade = prioridade;
        BeneficiarioID = beneficarioID;
        Ativo = true;
    }

    public void Deletar()
    {
        Ativo = false;
    }

    public void Restaurar()
    {
        Ativo = true;
    }

=======
namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Necessidade
{

    private int _id;
    private string _descricao;
    private DateTime _dataRegistro;
    private string _prioridade;
    private int _beneficiarioID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }
    public string Descricao
    {
        get { return _descricao; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricao = value;
        }
    }
    public DateTime DataRegistro
    {
        get { return _dataRegistro; }
        set { _dataRegistro = value; }
    }
    public string Prioridade
    {
        get { return _prioridade; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Prioridade não pode ser vaia.");

            _prioridade = value;
        }
    }
    public int BeneficiarioID
    {
        get { return _beneficiarioID; }
        set 
        {
            if(value <= 0)
                throw new Exception("O ID do Beneficiário não pode ser zero ou negativo.");
                
            _beneficiarioID = value;
        }
    }
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }
    public Necessidade() { }

    public Necessidade(string descricao, DateTime dataRegistro, string prioridade, int beneficarioID)
    {
        Descricao = descricao;
        DataRegistro = dataRegistro;
        Prioridade = prioridade;
        BeneficiarioID = beneficarioID;
        Ativo = true;
    }

    public void Deletar()
    {
        Ativo = false;
    }

    public void Restaurar()
    {
        Ativo = true;
    }

>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
}