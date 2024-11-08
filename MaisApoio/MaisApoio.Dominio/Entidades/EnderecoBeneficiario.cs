namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class EnderecoBeneficiario : EnderecoBase
{
    private int _beneficiarioID;

    public int BeneficiarioID
    {
        get { return _beneficiarioID; }
        set { _beneficiarioID = value; }
    }

    public EnderecoBeneficiario() : base() { }

    public EnderecoBeneficiario(string rua, string bairro, int numero, string complemento, string cidade, string estado, string cep, int beneficiarioID) : base(rua, bairro, numero, complemento, cidade, estado, cep)
    {
        BeneficiarioID = beneficiarioID;
    }
}