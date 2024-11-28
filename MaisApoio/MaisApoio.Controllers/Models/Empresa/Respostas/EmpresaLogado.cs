using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using MaisApoio.MaisApoio.Dominio.Entidades;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class EmpresaLogado
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Cnpj { get; set; }
    public string Email { get; set; }
    public string Telefone { get; set; }
    public string SegmentoMercado { get; set; }
    public string ImagemPerfil { get; set; }
    public bool Ativo { get; set; }


    public EmpresaLogado()
    {

    }
    public EmpresaLogado(Empresa empresa)
    {
        Id = empresa.ID;
        Nome = empresa.Nome;
        Cnpj = empresa.CNPJ;
        Email = empresa.Email;
        Telefone = empresa.Telefone;
        SegmentoMercado = empresa.SegmentoMercado;
        ImagemPerfil = empresa.ImagemPerfil;
        Ativo = empresa.Ativo;
    }

}
