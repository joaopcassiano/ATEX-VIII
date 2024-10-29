namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Doacao
{
    private int _id;
    private string _tipoDoacao;
    private string _descricaoDoacao;
    private decimal _quantidade;
    private DateTime _dataDoacao;
    private int _beneficiarioID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }
    public string TipoDoacao
    {
        get { return _tipoDoacao; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("O Tipo da Doação não pode ser vazio.");

            _tipoDoacao = value;
        }
    }
    public string DescricaoDoacao
    {
        get { return _descricaoDoacao; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricaoDoacao = value;
        }
    }
    public decimal Quantidade
    {
        get { return _quantidade; }
        set
        {
            if(value <= 0)
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
            if(value <= 0)
                throw new Exception("O ID do Beneficiário não pode ser zero ou negativo.");
                
            _beneficiarioID = value;
        }
    }
    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }

    public Doacao() { }

    public Doacao(string tipoDoacao, string descricaoDoacao, decimal quantidade, DateTime dataDoacao, int beneficarioID)
    {
        TipoDoacao = tipoDoacao;
        DescricaoDoacao = descricaoDoacao;
        Quantidade = quantidade;
        DataDoacao = dataDoacao;
        BeneficiarioID = beneficarioID;
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