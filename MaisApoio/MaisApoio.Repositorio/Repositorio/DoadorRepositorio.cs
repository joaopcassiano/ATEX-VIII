using Neo4j.Driver;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;
public class DoadorRepositorio
{
    private readonly MaisApoioContexto _banco;

    public DoadorRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task CarregarImagemAsync(string imagemPerfil, int id)
    {
        string sql = "MATCH (d:Doador {DoadorID: $id}) SET d.ImagemPerfil = $imagemPerfil";

        using var session = _banco.ConectarNeo4j();

        await session.RunAsync(sql, new { id, imagemPerfil });
    }

public async Task<Doador> LogarAsync(string email, string senha)
{
    string cypher = @"
        MATCH (d:Doador {Email: $email, Senha: $senha})
        RETURN d.DoadorID AS ID, d.Nome AS Nome, d.Email AS Email, 
               d.Telefone AS Telefone, d.Cpf AS Cpf, d.DataNascimento AS DataNascimento, d.ImagemPerfil AS ImagemPerfil,
               d.Ativo AS Ativo";

    using (var conexao = _banco.ConectarNeo4j())
    {
        var doadorbanco = await conexao.RunAsync(cypher, new { email, senha });
        var doador = (await doadorbanco.ToListAsync()).FirstOrDefault();

        if (doador != null)
        {
            return new Doador
            {
                ID = doador["ID"].As<int>(),
                Nome = doador["Nome"].As<string>(),
                Email = doador["Email"].As<string>(),
                Telefone = doador["Telefone"].As<string>(),
                DataNascimento = doador["DataNascimento"].As<DateTime>(),
                CPF = doador["Cpf"].As<string>(),
                ImagemPerfil = doador["ImagemPerfil"].As<string>(),
                Ativo = doador["Ativo"].As<bool>()
            };
        }

        return null; // Retorna null se o login não for encontrado
    }
}

    public async Task<int> CriarAsync(Doador doador)
    {
        var sql = @"
    MATCH (s:Sequencia {tipo: 'Doador'})
    SET s.ultimoID = s.ultimoID + 1
    WITH s.ultimoID AS novoID
    CREATE (d:Doador {
        DoadorID: novoID, 
        Nome: $nome, 
        Telefone: $telefone, 
        Email: $email, 
        Senha: $senha, 
        DataNascimento: $dataNascimento, 
        Cpf: $cpf, 
        Ativo: $ativo
    })
    RETURN d.DoadorID AS ID";;

        using (var session = _banco.ConectarNeo4j())
        {
            var result = await session.RunAsync(sql, new
            {
                nome = doador.Nome,
                telefone = doador.Telefone,
                dataNascimento = doador.DataNascimento,
                cpf = doador.CPF,
                email = doador.Email,
                senha = doador.Senha,
                ativo = doador.Ativo
            });

            var record = await result.SingleAsync();
            return record["ID"].As<int>();
        }
    }

    public async Task<List<Doador>> ObterTodosAsync()
    {
        var sql = "MATCH (d:Doador) RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var doadoresBanco = await conexao.RunAsync(sql);
            var doadores = new List<Doador>();

            await doadoresBanco.ForEachAsync(record =>
            {
                var doador = new Doador
                {
                    ID = int.Parse(record["d"].As<INode>().Properties["DoadorID"].ToString()),
                    Nome = record["d"].As<INode>().Properties["Nome"].ToString(),
                    Telefone = record["d"].As<INode>().Properties["Telefone"].ToString(),
                    Email = record["d"].As<INode>().Properties["Email"].ToString(),
                    Senha = record["d"].As<INode>().Properties["Senha"].ToString(),
                    CPF = record["d"].As<INode>().Properties["Cpf"].ToString(),
                    DataNascimento = DateTime.Parse(record["d"].As<INode>().Properties["DataNascimento"].ToString()),
                    Ativo = bool.Parse(record["d"].As<INode>().Properties["Ativo"].ToString())
                };

                doadores.Add(doador);
            });

            return doadores;
        }
    }

    public async Task<Doador> ObterPorIdAsync(int id)
    {
        var sql = "MATCH (d:Doador {DoadorID: $id}) RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var doadorBanco = await conexao.RunAsync(sql, new { id });
            var dado = (await doadorBanco.ToListAsync()).FirstOrDefault();

            if (dado != null)
            {
                var doadorNode = dado["d"].As<INode>();

                return new Doador
                {
                    ID = int.Parse(doadorNode.Properties["DoadorID"].ToString()),
                    Nome = doadorNode.Properties["Nome"].ToString(),
                    Telefone = doadorNode.Properties["Telefone"].ToString(),
                    Senha = doadorNode.Properties["Senha"].ToString(),
                    Email = doadorNode.Properties["Email"].ToString(),
                    CPF = doadorNode.Properties["Cpf"].ToString(),
                    DataNascimento = DateTime.Parse(doadorNode.Properties["DataNascimento"].ToString()),
                    Ativo = bool.Parse(doadorNode.Properties["Ativo"].ToString())
                };
            }

            return null;
        }
    }

    public async Task AtualizarAsync(Doador doador)
    {
        var sql = @"
                MATCH (d:Doador {DoadorID: $id})
                SET d.Nome = $nome, d.Telefone = $telefone, d.DataNascimento = $dataNascimento, d.Cpf = $cpf, d.Senha = $senha, d.Email = $email, d.Ativo = $ativo
                RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            await conexao.RunAsync(sql, new
            {
                id = doador.ID,
                nome = doador.Nome,
                telefone = doador.Telefone,
                cpf = doador.CPF,
                email = doador.Email,
                senha = doador.Senha,
                dataNascimento = doador.DataNascimento,
                ativo = doador.Ativo
            });
        }
    }

    public async Task ExclusaoLogicaAsync(int id)
    {
        var sql = "MATCH (d:Doador {DoadorID: $id}) SET d.Ativo = false RETURN d";

        using (var session = _banco.ConectarNeo4j())
        {
            await session.RunAsync(sql, new { id });
        }
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        var sql = "MATCH (d:Doador {DoadorID: $id}) DETACH DELETE d";

        using (var session = _banco.ConectarNeo4j())
        {
            await session.RunAsync(sql, new { id });
        }
    }

    public async Task<Doador> ObterPorEmailAsync(string email)
    {
        var neo4j = "MATCH (d:Doador {Email: $email}) RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var doadorBanco = await conexao.RunAsync(neo4j, new { email });
            var doador = (await doadorBanco.ToListAsync()).FirstOrDefault();

            if (doador != null)
            {
                var doadorNode = doador["d"].As<INode>();
                return new Doador
                {
                    ID = int.Parse(doadorNode.Properties["DoadorID"].ToString()),
                    Nome = doadorNode.Properties["Nome"].ToString(),
                    Telefone = doadorNode.Properties["Telefone"].ToString(),
                    Senha = doadorNode.Properties["Senha"].ToString(),
                    Email = doadorNode.Properties["Email"].ToString(),
                    CPF = doadorNode.Properties["Cpf"].ToString(),
                    DataNascimento = DateTime.Parse(doadorNode.Properties["DataNascimento"].ToString()),
                    Ativo = bool.Parse(doadorNode.Properties["Ativo"].ToString())
                };
            }

            return null;
        }
    }

    public async Task<Doador> ObterPorTelefoneAsync(string telefone)
    {
        var neo4j = "MATCH (d:Doador {Telefone: $telefone}) RETURN d";
        using (var conexao = _banco.ConectarNeo4j())
        {
            var doadorbanco = await conexao.RunAsync(neo4j, new { telefone });
            var doador = (await doadorbanco.ToListAsync()).FirstOrDefault();

            if (doador != null)
            {
                var doadorNode = doador["d"].As<INode>();
                return new Doador
                {
                    ID = int.Parse(doadorNode.Properties["DoadorID"].ToString()),
                    Nome = doadorNode.Properties["Nome"].ToString(),
                    Telefone = doadorNode.Properties["Telefone"].ToString(),
                    Senha = doadorNode.Properties["Senha"].ToString(),
                    Email = doadorNode.Properties["Email"].ToString(),
                    CPF = doadorNode.Properties["Cpf"].ToString(),
                    DataNascimento = DateTime.Parse(doadorNode.Properties["DataNascimento"].ToString()),
                    Ativo = bool.Parse(doadorNode.Properties["Ativo"].ToString())
                };
            }
            return null;
        }
    }

    public async Task<Doador> ObterPorNomeAsync(string nome)
    {
        var neo4j = "MATCH (d:Doador {Nome: $nome}) RETURN d";
        using (var conexao = _banco.ConectarNeo4j())
        {
            var doadorBanco = await conexao.RunAsync(neo4j, new { nome });
            var doador = (await doadorBanco.ToListAsync()).FirstOrDefault();

            if (doador != null)
            {
                var doadorNode = doador["d"].As<INode>();
                return new Doador
                {
                    ID = int.Parse(doadorNode.Properties["DoadorID"].ToString()),
                    Nome = doadorNode.Properties["Nome"].ToString(),
                    Telefone = doadorNode.Properties["Telefone"].ToString(),
                    Senha = doadorNode.Properties["Senha"].ToString(),
                    Email = doadorNode.Properties["Email"].ToString(),
                    CPF = doadorNode.Properties["Cpf"].ToString(),
                    DataNascimento = DateTime.Parse(doadorNode.Properties["DataNascimento"].ToString()),
                    Ativo = bool.Parse(doadorNode.Properties["Ativo"].ToString())
                };
            }
            return null;
        }
    }

}



