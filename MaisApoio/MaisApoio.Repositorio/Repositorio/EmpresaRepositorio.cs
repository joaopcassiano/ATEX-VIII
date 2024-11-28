using Neo4j.Driver;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio;
public class EmpresaRepositorio
{
    private readonly MaisApoioContexto _banco;

    public EmpresaRepositorio()
    {
        _banco = new MaisApoioContexto();
    }

    public async Task CarregarImagemAsync(string imagemPerfil, int id)
    {
        string sql = "MATCH (d:Empresa {EmpresaID: $id}) SET d.ImagemPerfil = $imagemPerfil";

        using var session = _banco.ConectarNeo4j();

        await session.RunAsync(sql, new { id, imagemPerfil });
    }

    public async Task<Empresa> LogarAsync(string email, string senha)
    {
        string cypher = @"
        MATCH (d:Empresa {Email: $email, Senha: $senha})
        RETURN d.EmpresaID AS ID, d.Nome AS Nome, d.Email AS Email, 
               d.Telefone AS Telefone, d.Cnpj AS Cnpj, d.ImagemPerfil AS ImagemPerfil, d.SegmentoMercado AS SegmentoMercado,
               d.Ativo AS Ativo";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var empresabanco = await conexao.RunAsync(cypher, new { email, senha });
            var empresa = (await empresabanco.ToListAsync()).FirstOrDefault();

            if (empresa != null)
            {
                return new Empresa
                {
                    ID = empresa["ID"].As<int>(),
                    Nome = empresa["Nome"].As<string>(),
                    Email = empresa["Email"].As<string>(),
                    Telefone = empresa["Telefone"].As<string>(),
                    CNPJ = empresa["Cnpj"].As<string>(),
                    SegmentoMercado = empresa["SegmentoMercado"].As<string>(),
                    ImagemPerfil = empresa["ImagemPerfil"].As<string>(),
                    Ativo = empresa["Ativo"].As<bool>()
                };
            }

            return null;
        }
    }

    public async Task<int> CriarAsync(Empresa empresa)
    {
        var sql = @"
    MATCH (s:Sequencia {tipo: 'Empresa'})
    SET s.ultimoID = s.ultimoID + 1
    WITH s.ultimoID AS novoID
    CREATE (d:Empresa {
        EmpresaID: novoID, 
        Nome: $nome, 
        Telefone: $telefone, 
        Email: $email, 
        Senha: $senha, 
        DataNascimento: $dataNascimento, 
        Cnpj: $cnpj, 
        SegmentoMercado: $SegmentoMercado, 
        Ativo: $ativo
    })
    RETURN d.EmpresaID AS ID"; ;

        using (var session = _banco.ConectarNeo4j())
        {
            var result = await session.RunAsync(sql, new
            {
                nome = empresa.Nome,
                telefone = empresa.Telefone,
                cnpj = empresa.CNPJ,
                segmentoMercado = empresa.SegmentoMercado,
                email = empresa.Email,
                senha = empresa.Senha,
                ativo = empresa.Ativo
            });

            var record = await result.SingleAsync();
            return record["ID"].As<int>();
        }
    }

    public async Task<List<Empresa>> ObterTodosAsync()
    {
        var sql = "MATCH (d:Empresa) RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var empresasBanco = await conexao.RunAsync(sql);
            var empresas = new List<Empresa>();

            await empresasBanco.ForEachAsync(record =>
            {
                var empresa = new Empresa
                {
                    ID = int.Parse(record["d"].As<INode>().Properties["EmpresaID"].ToString()),
                    Nome = record["d"].As<INode>().Properties["Nome"].ToString(),
                    Telefone = record["d"].As<INode>().Properties["Telefone"].ToString(),
                    Email = record["d"].As<INode>().Properties["Email"].ToString(),
                    Senha = record["d"].As<INode>().Properties["Senha"].ToString(),
                    CNPJ = record["d"].As<INode>().Properties["Cnpj"].ToString(),
                    SegmentoMercado = record["d"].As<INode>().Properties["SegmentoMercado"].ToString(),
                    Ativo = bool.Parse(record["d"].As<INode>().Properties["Ativo"].ToString()),
                    ImagemPerfil = record["d"].As<INode>().Properties.ContainsKey("ImagemPerfil")
    ? record["d"].As<INode>().Properties["ImagemPerfil"].ToString()
    : null,
                };

                empresas.Add(empresa);
            });

            return empresas;
        }
    }

    public async Task<Empresa> ObterPorIdAsync(int id)
    {
        var sql = "MATCH (d:Empresa {EmpresaID: $id}) RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var empresaBanco = await conexao.RunAsync(sql, new { id });
            var dado = (await empresaBanco.ToListAsync()).FirstOrDefault();

            if (dado != null)
            {
                var empresaNode = dado["d"].As<INode>();

                return new Empresa
                {
                    ID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                    Nome = empresaNode.Properties["Nome"].ToString(),
                    Telefone = empresaNode.Properties["Telefone"].ToString(),
                    Senha = empresaNode.Properties["Senha"].ToString(),
                    Email = empresaNode.Properties["Email"].ToString(),
                    CNPJ = empresaNode.Properties["Cnpj"].ToString(),
                    SegmentoMercado = empresaNode.Properties["SegmentoMercado"].ToString(),
                    ImagemPerfil = empresaNode.Properties.ContainsKey("ImagemPerfil")
    ? empresaNode.Properties["ImagemPerfil"].ToString()
    : null,
                    Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                };
            }

            return null;
        }
    }

    public async Task AtualizarAsync(Empresa empresa)
    {
        var sql = @"
                MATCH (d:Empresa {EmpresaID: $id})
                SET d.Nome = $nome, d.Telefone = $telefone, d.Cnpj = $cnpj, d.SegmentoMercado = $segmentoMercado, d.Senha = $senha, d.Email = $email, d.Ativo = $ativo
                RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            await conexao.RunAsync(sql, new
            {
                id = empresa.ID,
                nome = empresa.Nome,
                telefone = empresa.Telefone,
                cnpj = empresa.CNPJ,
                segmentoMercado = empresa.SegmentoMercado,
                email = empresa.Email,
                senha = empresa.Senha,
                ativo = empresa.Ativo
            });
        }
    }

    public async Task ExclusaoLogicaAsync(int id)
    {
        var sql = "MATCH (d:Empresa {EmpresaID: $id}) SET d.Ativo = false RETURN d";

        using (var session = _banco.ConectarNeo4j())
        {
            await session.RunAsync(sql, new { id });
        }
    }

    public async Task ExclusaoFisicaAsync(int id)
    {
        var sql = "MATCH (d:Empresa {EmpresaID: $id}) DETACH DELETE d";

        using (var session = _banco.ConectarNeo4j())
        {
            await session.RunAsync(sql, new { id });
        }
    }

    public async Task<Empresa> ObterPorEmailAsync(string email)
    {
        var neo4j = "MATCH (d:Empresa {Email: $email}) RETURN d";

        using (var conexao = _banco.ConectarNeo4j())
        {
            var empresaBanco = await conexao.RunAsync(neo4j, new { email });
            var empresa = (await empresaBanco.ToListAsync()).FirstOrDefault();

            if (empresa != null)
            {
                var empresaNode = empresa["d"].As<INode>();
                return new Empresa
                {
                    ID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                    Nome = empresaNode.Properties["Nome"].ToString(),
                    Telefone = empresaNode.Properties["Telefone"].ToString(),
                    Senha = empresaNode.Properties["Senha"].ToString(),
                    Email = empresaNode.Properties["Email"].ToString(),
                    CNPJ = empresaNode.Properties["Cnpj"].ToString(),
                    SegmentoMercado = empresaNode.Properties["SegmentoMercado"].ToString(),
                    ImagemPerfil = empresaNode.Properties.ContainsKey("ImagemPerfil")
    ? empresaNode.Properties["ImagemPerfil"].ToString()
    : null,
                    Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                };
            }

            return null;
        }
    }

}