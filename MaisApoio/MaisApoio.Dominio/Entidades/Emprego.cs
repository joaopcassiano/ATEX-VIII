<<<<<<< HEAD
namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Emprego
{
    private int _id;
    private string _tituloVaga;
    private string _descricaoVaga;
    private double _salario;
    private int _enderecoID;
    private int _beneficiarioID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }

    public string TituloVaga
    {
        get { return _tituloVaga; }
        set { _tituloVaga = value; }
    }

    public string DescricaoVaga 
    {
        get { return _descricaoVaga; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricaoVaga = value;
        }
    }

    public double Salario
    {
        get { return _salario; }
        set
        {
            if(value <= 0)
                throw new Exception("O Salário não pode ser zero ou negativo.");
                
            _salario = value;
        }
    }

    public int EnderecoID
    {
        get { return _enderecoID; }
        set
        {
            if (value <= 0)
                throw new ArgumentException("Endereço inválido.");

            _enderecoID = value;
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

    public Emprego() { }

    public Emprego(string tituloVaga, string descricaoVaga, double salario, int enderecoID, int beneficiarioID)
    {
        TituloVaga = tituloVaga;
        DescricaoVaga = descricaoVaga;
        Salario = salario;
        EnderecoID = enderecoID;
        BeneficiarioID = beneficiarioID;
        Ativo = true;
    }

    public void Deletar()
    {
        Ativo = false;
    }
    public void Restaurarr()
    {
        Ativo = true;
    }

=======
namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Emprego
{
    private int _id;
    private string _tituloVaga;
    private string _descricaoVaga;
    private double _salario;
    private int _enderecoID;
    private int _beneficiarioID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }

    public string TituloVaga
    {
        get { return _tituloVaga; }
        set { _tituloVaga = value; }
    }

    public string DescricaoVaga 
    {
        get { return _descricaoVaga; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricaoVaga = value;
        }
    }

    public double Salario
    {
        get { return _salario; }
        set
        {
            if(value <= 0)
                throw new Exception("O Salário não pode ser zero ou negativo.");
                
            _salario = value;
        }
    }

    public int EnderecoID
    {
        get { return _enderecoID; }
        set
        {
            if (value <= 0)
                throw new ArgumentException("Endereço inválido.");

            _enderecoID = value;
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

    public Emprego() { }

    public Emprego(string tituloVaga, string descricaoVaga, double salario, int enderecoID, int beneficiarioID)
    {
        TituloVaga = tituloVaga;
        DescricaoVaga = descricaoVaga;
        Salario = salario;
        EnderecoID = enderecoID;
        BeneficiarioID = beneficiarioID;
        Ativo = true;
    }

    public void Deletar()
    {
        Ativo = false;
    }
    public void Restaurarr()
    {
        Ativo = true;
    }

>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
}