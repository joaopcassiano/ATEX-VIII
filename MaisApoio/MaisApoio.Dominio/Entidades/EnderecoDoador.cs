namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class EnderecoDoador : EnderecoBase
{
    private int _doadorID;

    public int DoadorID
    {
        get { return _doadorID; }
        set { _doadorID = value; }
    }

    public EnderecoDoador() : base() { }

    public EnderecoDoador(string rua, string bairro, int numero, string complemento, string cidade, string estado, string cep, int doadorID) : base(rua, bairro, numero, complemento, cidade, estado, cep)
    {
        DoadorID = doadorID;
    }
}