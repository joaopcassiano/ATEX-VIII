namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Beneficiario
{
    private int _id;
    private string _nome;
    private DateTime _dataNascimento;
    private int _enderecoID;
    private string _situacaoEconomica;
    private string _email;
    private bool _ativo;

    public int ID 
    {
        get { return _id; }
        set { _id = value; }
    }

    public string Nome 
    {
        get { return _nome; }
        set { _nome = value; }
    }

    public DateTime DataNascimento
    {
        get { return _dataNascimento; }
        set { _dataNascimento = value; }
    }
    
    public int EnderecoID
    {
        get { return _enderecoID; }
        set { _enderecoID = value; }
    }
    
    public string SituacaoEconomica
    {
        get { return _situacaoEconomica; }
        set { _situacaoEconomica = value; }
    }
    
    public string Email
    {
        get { return _email; }
        set { _email = value; }
    }
    
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Beneficiario()
    {
    
    }

    public Beneficiario(string nome, string email, string situacaoEconomica, DateTime dataNascimento, int enderecoID)
    {
        _nome = nome;
        _email = email;
        _situacaoEconomica = situacaoEconomica;
        _dataNascimento = dataNascimento;
        _enderecoID = enderecoID;
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