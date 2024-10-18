namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Endereco
{
    private int _id;
    private string _rua;
    private string _bairro;
    private float _numero;
    private string _complemento;
    private string _cidade;
    private string _cep;
    private bool _ativo;

    public int ID
    {
        get{return _id;}
        set{_id = value;}
    }
    public string Rua
    {
        get{return _rua;}
        set{_rua = value;}
    }
    public string Bairro
    {
        get{return _bairro;}
        set{_bairro = value;}
    }
    public float Numero
    {
        get{return _numero;}
        set{_numero = value;}
    }
    public string Complemento
    {
        get{return _complemento;}
        set{_complemento = value;}
    }
    public string Cidade
    {
        get{return _cidade;}
        set{_cidade = value;}
    }
    public string Cep
    {
        get{return _cep;}
        set{_cep = value;}
    }
    public bool Ativo
    {
        get{return _ativo;}
        set{_ativo = value;}
    }

    public Endereco(){}

    public Endereco(string rua, string bairro, float numero, string complemento, string cidade, string cep)
    {
        _rua = rua;
        _bairro = bairro;
        _numero = numero;
        _complemento = complemento;
        _cidade = cidade;
        _cep = cep;
        _ativo = true;
    }

    public void Deletar()
    {
        _ativo = false;
    }
    public void Restaurar()
    {
        _ativo = true;
    }

}