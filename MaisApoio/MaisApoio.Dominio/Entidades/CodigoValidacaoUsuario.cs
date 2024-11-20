using MaisApoio.Dominio.Enumeradores;

public class CodigoValidacaoUsuario
{
    private int _id;
    private TipoUsuario _tipoUsuario;
    private string _email;
    private int _codigo;
    private DateTime _dataExpiracao;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }

    public TipoUsuario TipoUsuario
    {
        get { return _tipoUsuario; }
        set { _tipoUsuario = value; }
    }

    public string Email 
    {
        get { return _email; }
        set { _email = value; }
    }

    public int Codigo
    {
        get { return _codigo; }
        set { _codigo = value; }
    }

    public DateTime DataExpiracao 
    {
        get { return _dataExpiracao; }
        set { _dataExpiracao = value; }
    }

    public CodigoValidacaoUsuario() { }

    public CodigoValidacaoUsuario(TipoUsuario tipoUsuario, string email, int codigo)
    {
        TipoUsuario = tipoUsuario;
        Email = email;
        Codigo = codigo;
        DataExpiracao = DateTime.Now.AddMinutes(5);
    }
}