namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Voluntario
{
    private int _id;
    private string _nome;
    private string _areaAtuacao;
    private string _disponibilidade;
    private int _enderecoID;
    private string _telefone;
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
    public string AreaAtuacao
    {
        get { return _areaAtuacao; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Área de atuação não pode ser vazia.");
        }
    }
    private int EnderecoID
    {
        get { return _enderecoID; }
        set
        {
            if (value <= 0)
                throw new ArgumentException("Endereço não pode ser vazio.");
        }
    }
    public string Disponibilidade
    {
        get { return _disponibilidade; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Disponibilidade não pode ser vazia.");
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

    public Voluntario() { }

    public Voluntario(string nome, string telefone, string email, string areaAtuacao, string disponibilidade, int enderecoID)
    {
        Nome = nome;
        AreaAtuacao = areaAtuacao;
        Disponibilidade = disponibilidade;
        Telefone = telefone;
        EnderecoID = enderecoID;
        Email = email;
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