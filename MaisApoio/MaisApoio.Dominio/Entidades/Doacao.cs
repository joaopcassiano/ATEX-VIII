namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Doacao
{
    private int _id;
    private string _tipoDoacao;
    private string _descricaoDoacao;
    private float _quantidade;
    private DateTime _dataDoacao;
    private int _beneficiarioID;
    private bool _ativoDoacao;

    public int ID
    {
        get{return _id;}
        set{_id = value;}
    }
    public string TipoDoacao
    {
        get{return _tipoDoacao;}
        set{_tipoDoacao = value;}
    }
    public string DescricaoDoacao
    {
        get{return _descricaoDoacao;}
        set{_descricaoDoacao = value;}
    }
    public float Quantidade
    {
        get{return _quantidade;}
        set{_quantidade = value;}
    }
    public DateTime DataDoacao
    {
        get{return _dataDoacao;}
        set{_dataDoacao = value;}
    }
    public int beneficarioID
    {
        get{return _beneficiarioID;}
        set{_beneficiarioID = value;}
    }
    public bool AtivoDoacao
    {
        get{return _ativoDoacao;}
        set{_ativoDoacao = value;}
    }

    public Doacao(){}

    public Doacao(string tipoDoacao, string descricaoDoacao, float quantidade, DateTime dataDoacao, int beneficarioID)
    {
        _tipoDoacao = tipoDoacao;
        _descricaoDoacao = descricaoDoacao;
        _quantidade = quantidade;
        _dataDoacao = dataDoacao;
        _beneficiarioID = beneficarioID;
        _ativoDoacao = true;
    }
    public void Deletar()
    {
        _ativoDoacao = false;
    }
    public void Restaurar()
    {
        _ativoDoacao = true;
    }

}