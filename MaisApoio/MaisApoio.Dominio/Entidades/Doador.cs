namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Doador
{
    private int _id;

    private byte[]? _imagemPerfil;
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
    public byte[]? ImagemPerfil
    {
        get { return _imagemPerfil; }
        set { _imagemPerfil = value; }
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
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Doador
{
    private int _id;
    private string _nome;
    private string _telefone;
    private string _email;
    private string _senha;
    private DateTime _dataNascimento;
    private string? _imagemPerfil;
    private bool _ativo;
    private string _cpf;

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

    public string CPF
    {
        get { return _cpf; }
        set
        {
            if (string.IsNullOrEmpty(value) || value.Length != 14)
            {
                throw new Exception("CPF inválido.");
            }

            _cpf = value;
        }
    }

    public string Telefone
    {
        get { return _telefone; }
        set
        {
            if (string.IsNullOrEmpty(value) || value.Length != 15)
                throw new Exception("Telefone inválido.");
            _telefone = value;
        }
    }

    public DateTime DataNascimento
    {
        get { return _dataNascimento; }
        set
        {
            if (value >= DateTime.Now)
                throw new ArgumentException("Data de nascimento inválida.");

            _dataNascimento = value;
        }
    }

    public string? ImagemPerfil
    {
        get { return _imagemPerfil; }
        set { _imagemPerfil = value; }
    }

    public string Email
    {
        get { return _email; }
        set
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");

            if (!emailRegex.IsMatch(value) || string.IsNullOrEmpty(value))
                throw new ArgumentException("Email inválido.");

            _email = value;
        }
    }

    public string Senha
    {
        get { return _senha; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new ArgumentException("Senha inválida.");

            _senha = value;
        }
    }

    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Doador()
    {

    }

    public Doador(string nome, string cpf, string telefone, string email, DateTime dataNascimento, string senha)
    {
        Nome = nome;
        CPF = cpf;
        Telefone = telefone;
        Email = email;
        Senha = senha;
        DataNascimento = dataNascimento;
        Ativo = true;
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