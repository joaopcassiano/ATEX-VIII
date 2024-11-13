using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class DoacaoRepositorio
{
    private MaisApoioContexto _banco;

    public DoacaoRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

}