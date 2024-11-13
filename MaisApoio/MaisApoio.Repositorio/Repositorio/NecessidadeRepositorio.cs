using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using System.Data.Common;
namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class NecessidadeRepositorio
{
    private MaisApoioContexto _banco;

    public NecessidadeRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

}