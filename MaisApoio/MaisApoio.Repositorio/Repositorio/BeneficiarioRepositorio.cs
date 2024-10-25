using System.Collections;
using System.Data.SqlTypes;
using Dapper;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using Neo4j.Driver;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;

public class BeneficiarioRepositorio
{
    private MaisApoioContexto _banco = new MaisApoioContexto();

    public async Task<List<Beneficiario>> ObterTodos()
    {
        string sql = "SELECT * FROM Beneficiario";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        var beneficiarios = await conexao.QueryAsync<Beneficiario>(sql);

        conexao.Close();

        return beneficiarios.ToList();
    }

    public async Task CarregarImagem(IFormFile file, int id)
    {
        var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        string sql = "Insert into Beneficiario(ImagemPerfil) velues (@arquivo) WHERE BebeficiarioID = @id";

        var conexao = _banco.ConectarSqlServer();

        conexao.Open();

        await conexao.ExecuteAsync(sql, new { id = id, arquivo = ms.ToArray() });

        conexao.Close();
    }

    public async Task CriarBeneficiarioNeo4j(Beneficiario beneficiario)
    {
        var conexao = _banco.ConectarNeo4j();

        var query = @"
            CREATE (b:Beneficiario {
                ID: $ID, Nome: $Nome, Email: $Email, 
                SituacaoEconomica: $SituacaoEconomica, DataNascimento: $DataNascimento, 
                EnderecoID: $EnderecoID, Ativo: $Ativo
            })";

        await conexao.RunAsync(query, beneficiario);

        await conexao.CloseAsync();

    }

    public async Task<Beneficiario> ObterBeneficiarioNeo4j(int id)
    {
        var conexao = _banco.ConectarNeo4j();

        var query = "MATCH (b:Beneficiario {ID: $ID}) RETURN b LIMIT 1";

        var resultado = await conexao.RunAsync(query, new { ID = id });

        var beneficiariotemp = await resultado.SingleAsync();

        var bene = beneficiariotemp["b"].As<INode>();

        var beneficiario = new Beneficiario()
        {
            ID = bene["Id"].As<int>(),
            Nome = bene["Nome"].As<string>(),
            Email = bene["Email"].As<string>(),
            SituacaoEconomica = bene["SituacaoEconomica"].As<string>(),
            DataNascimento = DateTime.Parse(bene["DataNascimento"].As<string>()),
            EnderecoID = bene["EnderecoID"].As<int>(),
            Ativo = bene["Ativo"].As<bool>()
        };

        await conexao.CloseAsync();

        return beneficiario;
    }

    public async Task AtualizarBeneficiarioNeo4j(Beneficiario beneficiario)
    {
        var session = _banco.ConectarNeo4j();

        var query = @"
            MATCH (b:Beneficiario {ID: $ID})
            SET b.Nome = $Nome, b.Email = $Email, 
                b.SituacaoEconomica = $SituacaoEconomica, 
                b.DataNascimento = $DataNascimento, 
                b.EnderecoID = $EnderecoID, b.Ativo = $Ativo";

        await session.RunAsync(query, beneficiario);

        await session.CloseAsync();

    }

    public async Task DeletarBeneficiarioNeo4j(int id)
    {
        var session = _banco.ConectarNeo4j();

        var query = "MATCH (b:Beneficiario {ID: $ID}) DELETE b";

        await session.RunAsync(query, new { ID = id });

        await session.CloseAsync();

    }

}