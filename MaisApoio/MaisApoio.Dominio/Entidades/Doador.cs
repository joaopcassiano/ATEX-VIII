namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Doador
{
    private int _id;
    private string _nome;
    private string _telefone;
    private int _enderecoID;
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
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Nome não pode ser vazio.");

            _nome = value;
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
    public string Telefone
    {
        get { return _telefone; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Telefone não pode ser vazio.");
        }
    }
    public string Email
    {
        get { return _email; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Email não pode ser vazio.");
        }
    }
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Doador() { }

    public Doador(string nome, string telefone, string email, int enderecoID)
    {
        Nome = nome;
        Telefone = telefone;
        Email = email;
        EnderecoID = enderecoID;
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