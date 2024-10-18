namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Necessidade{

    private int _id;
    private string _descricao;
    private DateTime _dataRegistro;
    private string _prioridade;
    private int _beneficiarioID;
    private bool _ativoNecessidade;

    public int ID
    {
        get{return _id;}
        set{_id = value;}
    }
    public string Descricao
    {
        get{return _descricao;}
        set{_descricao = value;}
    }
    public DateTime DataRegistro
    {
        get{return _dataRegistro;}
        set{_dataRegistro = value;}
    }
    public string Prioridade
    {
        get{return _prioridade;}
        set{_prioridade = value;}
    }
    public int _BeneficiarioID
    {
        get{return _beneficiarioID;}
        set{_beneficiarioID = value;}
    }
    public bool AtivoNecessidade
    {
        get{return _ativoNecessidade;}
        set{_ativoNecessidade = value;}
    }
    public Necessidade(){}

    public Necessidade(string descricao, DateTime dataRegistro, string prioridade, int beneficarioID)
    {   
        _descricao = descricao;
        _dataRegistro = dataRegistro;
        _prioridade = prioridade;
        _beneficiarioID = beneficarioID;
        _ativoNecessidade = true;
    }

    public void Deletar()
    {
        _ativoNecessidade = false;
    }

    public void Restaurar()
    {
        _ativoNecessidade = true;
    }






}