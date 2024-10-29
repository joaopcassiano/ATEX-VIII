using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Beneficiario
{
    private int _id;
    private string _nome;
    private DateTime _dataNascimento;
    private int _enderecoID;
    private decimal _situacaoEconomica;
    private string _email;
    private string _senha;
    private byte[]? _imagemPerfil;
    private bool _ativo;

    [JsonIgnore]
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

    [JsonIgnore]
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

    public decimal SituacaoEconomica
    {
        get { return _situacaoEconomica; }
        set
        {
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
            _senha = value;
        }
    }
    [JsonIgnore]
    public byte[]? ImagemPerfil
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

    public Beneficiario(string nome, string email, decimal situacaoEconomica, DateTime dataNascimento, int enderecoID, string senha)
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