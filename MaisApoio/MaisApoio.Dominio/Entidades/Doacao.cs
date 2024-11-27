namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Doacao
{
    private int _id;
    private string _descricaoDoacao;
    private decimal _quantidade;
    private DateTime _dataDoacao;
    private int _beneficiarioID;
    private int _doadorID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }
    public string DescricaoDoacao
    {
        get { return _descricaoDoacao; }
        set
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricaoDoacao = value;
        }
    }
    public decimal Quantidade
    {
        get { return _quantidade; }
        set
        {
            if (value <= 0)
                throw new Exception("A Quantidade não pode ser zero ou negativa.");

            _quantidade = value;
        }
    }
    public DateTime DataDoacao
    {
        get { return _dataDoacao; }
        set { _dataDoacao = value; }
    }
    public int BeneficiarioID
    {
        get { return _beneficiarioID; }
        set
        {
            if (value <= 0)
                throw new Exception("O ID do Beneficiário não pode ser zero ou negativo.");

            _beneficiarioID = value;
        }
    }
    public int DoadorID
    {
        get { return _doadorID; }
        set
        {
            if (value <= 0)
                throw new Exception("O ID do Doador não pode ser zero ou negativo.");

            _doadorID = value;
        }
    }
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Doacao() { }

    public Doacao(string descricaoDoacao, decimal quantidade,int doadorID, int beneficarioID)
    {
        DescricaoDoacao = descricaoDoacao;
        Quantidade = quantidade;
        DataDoacao = DateTime.Now;
        BeneficiarioID = beneficarioID;
        DoadorID = doadorID;
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