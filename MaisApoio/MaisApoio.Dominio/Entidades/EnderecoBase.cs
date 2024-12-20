using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class EnderecoBase
{
    protected int _id;
    protected string _rua;
    protected string _bairro;
    protected int _numero;
    protected string _complemento;
    protected string _cidade;
    protected string _estado;
    protected string _cep;
    protected bool _ativo;

    public int ID
    {
        get{return _id;}
        set{_id = value;}
    }
    public string Rua
    {
        get{return _rua;}
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A rua não pode ser vazia.");

            _rua = value;
        }
    }
    public string Bairro
    {
        get{return _bairro;}
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("O Bairro não pode ser vazio.");

            _bairro = value;
        }
    }
    public int Numero
    {
        get{return _numero;}
        set
        {
            if(value < 0)
                throw new Exception("O Número não pode ser negativo.");
                
            _numero = value;
        }
    }
    public string Complemento
    {
        get{return _complemento;}
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("O Complemento não pode ser vazio.");

            _complemento = value;
        }
    }
    public string Cidade
    {
        get{return _cidade;}
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Cidade não pode ser vazia.");

            _cidade = value;
        }
    }

    public string Estado
    {
        get{return _estado;}
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("O estado não pode ser vazio.");

            _estado = value;
        }
    }

    public string Cep
    {
        get{return _cep;}
        set
        {
            var cepRegex = new Regex(@"^\d{2}\.\d{3}-\d{3}$");
            if (!cepRegex.IsMatch(value))
                throw new ArgumentException("CEP inválido. O formato deve ser 99.999-000.");
            _cep = value;
        }
    }
    public bool Ativo
    {
        get{return _ativo;}
        set{_ativo = value;}
    }

    public EnderecoBase(){}

    public EnderecoBase(string rua, string bairro, int numero, string complemento, string cidade, string estado, string cep)
    {
        Rua = rua;
        Bairro = bairro;
        Numero = numero;
        Complemento = complemento;
        Cidade = cidade;
        Estado = estado;
        Cep = cep;
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

}