using System.Data;

namespace MaisApoio.MaisApoio.Dominio.Entidades;

public class Necessidade
{

    private int _id;
    private string _descricao;
    private DateTime _dataRegistro;
    private string _prioridade;
    private int _beneficiarioID;
    private int _voluntarioID;
    private bool _ativo;

    public int ID
    {
        get { return _id; }
        set { _id = value; }
    }
    public string Descricao
    {
        get { return _descricao; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Descrição não pode ser vaia.");

            _descricao = value;
        }
    }
    public DateTime DataRegistro
    {
        get { return _dataRegistro; }
        set { _dataRegistro = value; }
    }
    public string Prioridade
    {
        get { return _prioridade; }
        set
        {
            if(string.IsNullOrEmpty(value))
                throw new Exception("A Prioridade não pode ser vaia.");

            _prioridade = value;
        }
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

    public int VoluntarioID
    {
        get { return _voluntarioID; }
        set 
        {
            if(value <= 0)
                throw new Exception("O ID do Voluntario não pode ser zero ou negativo.");
                
            _voluntarioID = value;
        }
    }


    public bool Ativo
    {
        get { return _ativo; }
        set { _ativo = value; }
    }
    public Necessidade() { }

    public Necessidade(string descricao, DateTime dataRegistro, string prioridade, int beneficarioID, int voluntarioID)
    {
        Descricao = descricao;
        DataRegistro = dataRegistro;
        Prioridade = prioridade;
        BeneficiarioID = beneficarioID;
        VoluntarioID = voluntarioID;
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