using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Beneficiario
{
    private int _id;
    private string _nome;
    private string _cpf;
    private string _telefone;
    private DateTime _dataNascimento;
    private string _necessidade;
    private decimal _situacaoEconomica;
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

    public string Necessidade
    {
        get { return _necessidade; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Necessidade não pode ser vazia.");

            _necessidade = value;
        }
    }

    public decimal SituacaoEconomica
    {
        get { return _situacaoEconomica; }
        set
        { _situacaoEconomica = value; }
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

    public Beneficiario(string nome, string cpf, string necessidade, string telefone, string email, decimal situacaoEconomica, DateTime dataNascimento, string senha)
    {
        Nome = nome;
        CPF = cpf;
        Telefone = telefone;
        Necessidade = necessidade;
        Email = email;
        Senha = senha;
        SituacaoEconomica = situacaoEconomica;
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