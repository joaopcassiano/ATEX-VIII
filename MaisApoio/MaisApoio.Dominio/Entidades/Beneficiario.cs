using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Beneficiario
{
    private int _id;
    private string _nome;

    private string _cpf;
    private DateTime _dataNascimento;
    private int _enderecoID;
    private string _situacaoEconomica;
    private string _email;
    private string _senha;
    private string? _imagemPerfil;
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

    public string Cpf 
    {
        get { return _cpf; }
        set
        {
            if (string.IsNullOrWhiteSpace(value) ||!Regex.IsMatch(value, @"^\d{3}\.\d{3}\.\d{3}-\d{2}$"))
                throw new ArgumentException("CPF inválido.");
                
            _cpf = value;
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

    public string SituacaoEconomica
    {
        get { return _situacaoEconomica; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Situação econômica não pode ser vazia.");

            _situacaoEconomica = value;
        }
    }

    public string Email
    {
        get { return _email; }
        set
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");

            if (!emailRegex.IsMatch(value))
                throw new ArgumentException("Email inválido.");

            _email = value;
        }
    }

    public string Senha
    {
        get { return _senha; }
        set
        {
            var senhaRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$");

            if (!senhaRegex.IsMatch(value))
                throw new ArgumentException("A senha deve ter pelo menos 8 caracteres, com pelo menos uma letra maiúscula, uma minúscula e um número.");
                
            _senha = value;
        }
    }

    public string ImagemPerfil
    {
        get { return _imagemPerfil; }
        set { _imagemPerfil = value; }
    }
    
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Beneficiario()
    {
    
    }

    public Beneficiario(string nome, string email, string situacaoEconomica, DateTime dataNascimento, int enderecoID, string senha)
    {
        Nome = nome;
        Email = email;
        Senha = senha;
        SituacaoEconomica = situacaoEconomica;
        DataNascimento = dataNascimento;
        EnderecoID = enderecoID;
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
}