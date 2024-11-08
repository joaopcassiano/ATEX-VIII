namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class EnderecoEmpresa : EnderecoBase
{
    private int _empresaID;

    public int EmpresaID
    {
        get { return _empresaID; }
        set { _empresaID = value; }
    }

    public EnderecoEmpresa() : base() { }

    public EnderecoEmpresa(string rua, string bairro, int numero, string complemento, string cidade, string estado, string cep, int empresaID) : base(rua, bairro, numero, complemento, cidade, estado, cep)
    {
        EmpresaID = empresaID;
    }
}