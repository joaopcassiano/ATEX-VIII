/namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class EnderecoVoluntario : EnderecoBase
{
    private int _voluntarioID;

    public int VoluntarioID
    {
        get { return _voluntarioID; }
        set { _voluntarioID = value; }
    }

    public EnderecoVoluntario() : base() { }

    public EnderecoVoluntario(string rua, string bairro, int numero, string complemento, string cidade, string estado, string cep, int voluntarioID) : base(rua, bairro, numero, complemento, cidade, estado, cep)
    {
        VoluntarioID = voluntarioID;
    }
}