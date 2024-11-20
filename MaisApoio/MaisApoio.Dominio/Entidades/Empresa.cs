using System.Text.RegularExpressions;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Empresa
{
    private int _id;
    private string _nome;
    private string _segmentoMercado;
    private string _telefone;
    private string _email;
    private string _senha;
    private string? _imagemPerfil;
    private bool _ativo;
    private string _cnpj;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }

    public string SegmentoMercado
    {
        get { return _segmentoMercado; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Segmento de mercado não pode ser vazio.");

            _segmentoMercado = value;
        }
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

    public string CNPJ
    {
        get { return _cnpj; }
        set
        {
            if (string.IsNullOrEmpty(value) || value.Length != 18)
            {
                throw new Exception("CNPJ inválido.");
            }

            _cnpj = value;
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

    public Empresa()
    {

    }

    public Empresa(string nome, string cnpj, string segmentoMercado, string telefone, string email, DateTime dataNascimento, string senha)
    {
        Nome = nome;
        CNPJ = cnpj; 
        SegmentoMercado = segmentoMercado;
        Telefone = telefone;
        Email = email;
        Senha = senha;
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