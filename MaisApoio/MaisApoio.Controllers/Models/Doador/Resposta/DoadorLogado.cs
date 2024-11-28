using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using MaisApoio.MaisApoio.Dominio.Entidades;

namespace MaisApoio.MaisApoio.Controllers.Models;

public class DoadorLogado
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Cpf { get; set; }
    public string Telefone { get; set; }
    public DateTime DataNascimento { get; set; }
    public string Email { get; set; }
    public string? ImagemPerfil { get; set; }
    public bool Ativo { get; set; }

    public DoadorLogado() { }
    public DoadorLogado(Doador doador)
    {
        Id = doador.ID;
        Nome = doador.Nome;
        Cpf = doador.CPF;
        Telefone = doador.Telefone;
        DataNascimento = doador.DataNascimento;
        Email = doador.Email;
        ImagemPerfil = doador.ImagemPerfil;
        Ativo = doador.Ativo;
    }

}