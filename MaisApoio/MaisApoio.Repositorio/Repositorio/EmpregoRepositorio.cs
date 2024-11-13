using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class EmpregoRepositorio
{
    private MaisApoioContexto _banco;

    public EmpregoRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

}