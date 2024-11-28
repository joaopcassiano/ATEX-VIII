using Neo4j.Driver;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class EmpresaRepositorio
    {
        private readonly MaisApoioContexto _banco;

        public EmpresaRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        // Método para carregar imagem de perfil para a empresa
        public async Task CarregarImagemAsync(string imagemPerfil, int id)
        {
            string sql = "MATCH (e:Empresa {EmpresaID: $id}) SET e.ImagemPerfil = $imagemPerfil";

            using var session = _banco.ConectarNeo4j();

            await session.RunAsync(sql, new { id, imagemPerfil });
        }

        // Método para logar a empresa pelo e-mail e senha
        public async Task<Empresa> LogarAsync(string email, string senha)
        {
            string cypher = @"
                MATCH (e:Empresa {Email: $email, Senha: $senha})
                RETURN e.EmpresaID AS ID, e.Nome AS Nome, e.Email AS Email, 
                       e.Telefone AS Telefone, e.Cnpj AS Cnpj, e.ImagemPerfil AS ImagemPerfil,
                       e.Ativo AS Ativo";

            using (var conexao = _banco.ConectarNeo4j())
            {
                var empresaBanco = await conexao.RunAsync(cypher, new { email, senha });
                var empresa = (await empresaBanco.ToListAsync()).FirstOrDefault();

                if (empresa != null)
                {
                    return new Empresa
                    {
                        ID = empresa["ID"].As<int>(),
                        Nome = empresa["Nome"].As<string>(),
                        Email = empresa["Email"].As<string>(),
                        Telefone = empresa["Telefone"].As<string>(),
                        CNPJ = empresa["Cnpj"].As<string>(),
                        ImagemPerfil = empresa["ImagemPerfil"].As<string>(),
                        Ativo = empresa["Ativo"].As<bool>()
                    };
                }

                return null; // Retorna null se o login não for encontrado
            }
        }

        // Método para criar uma nova empresa
        public async Task<int> CriarAsync(Empresa empresa)
        {
            var sql = @"
                CREATE (e:Empresa {EmpresaID: randomUUID(), Nome: $nome, Telefone: $telefone, 
                                    Email: $email, Senha: $senha, Cnpj: $cnpj, Ativo: $ativo, ImagemPerfil: $imagemPerfil})
                RETURN e.EmpresaID AS ID";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new
                {
                    nome = empresa.Nome,
                    telefone = empresa.Telefone,
                    cnpj = empresa.CNPJ,
                    email = empresa.Email,
                    senha = empresa.Senha,
                    ativo = empresa.Ativo,
                    imagemPerfil = empresa.ImagemPerfil
                });

                var record = await result.SingleAsync();
                return record["ID"].As<int>();
            }
        }

        // Método para obter todos os registros de empresas
        public async Task<List<Empresa>> ObterTodosAsync()
        {
            var sql = "MATCH (e:Empresa) RETURN e";

            using (var conexao = _banco.ConectarNeo4j())
            {
                var empresasBanco = await conexao.RunAsync(sql);
                var empresas = new List<Empresa>();

                await empresasBanco.ForEachAsync(record =>
                {
                    var empresa = new Empresa
                    {
                        ID = int.Parse(record["e"].As<INode>().Properties["EmpresaID"].ToString()),
                        Nome = record["e"].As<INode>().Properties["Nome"].ToString(),
                        Telefone = record["e"].As<INode>().Properties["Telefone"].ToString(),
                        Email = record["e"].As<INode>().Properties["Email"].ToString(),
                        Senha = record["e"].As<INode>().Properties["Senha"].ToString(),
                        CNPJ = record["e"].As<INode>().Properties["Cnpj"].ToString(),
                        ImagemPerfil = record["e"].As<INode>().Properties["ImagemPerfil"].ToString(),
                        Ativo = bool.Parse(record["e"].As<INode>().Properties["Ativo"].ToString())
                    };

                    empresas.Add(empresa);
                });

                return empresas;
            }
        }

        // Método para obter a empresa por ID
        public async Task<Empresa> ObterPorIdAsync(int id)
        {
            var sql = "MATCH (e:Empresa {EmpresaID: $id}) RETURN e";

            using (var conexao = _banco.ConectarNeo4j())
            {
                var empresaBanco = await conexao.RunAsync(sql, new { id });
                var dado = (await empresaBanco.ToListAsync()).FirstOrDefault();

                if (dado != null)
                {
                    var empresaNode = dado["e"].As<INode>();

                    return new Empresa
                    {
                        ID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Senha = empresaNode.Properties["Senha"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        CNPJ = empresaNode.Properties["Cnpj"].ToString(),
                        Segmento = empresaNode.Properties["Segmento"].ToString(),
                        ImagemPerfil = empresaNode.Properties["ImagemPerfil"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }

                return null;
            }
        }
        

        // Método para atualizar a empresa
        public async Task AtualizarAsync(Empresa empresa)
        {
            var sql = @"
                MATCH (e:Empresa {EmpresaID: $id})
                SET e.Nome = $nome, e.Telefone = $telefone, e.Cnpj = $cnpj, e.Senha = $senha, e.Email = $email, e.Ativo = $ativo, e.ImagemPerfil = $imagemPerfil
                RETURN e";

            using (var conexao = _banco.ConectarNeo4j())
            {
                await conexao.RunAsync(sql, new
                {
                    id = empresa.ID,
                    nome = empresa.Nome,
                    telefone = empresa.Telefone,
                    cnpj = empresa.CNPJ,
                    email = empresa.Email,
                    senha = empresa.Senha,
                    ativo = empresa.Ativo,
                    imagemPerfil = empresa.ImagemPerfil
                });
            }
        }

        // Método para exclusão lógica (desativar a empresa)
        public async Task ExclusaoLogicaAsync(int id)
        {
            var sql = "MATCH (e:Empresa {EmpresaID: $id}) SET e.Ativo = false RETURN e";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }

        // Método para exclusão física (deletar a empresa)
        public async Task ExclusaoFisicaAsync(int id)
        {
            var sql = "MATCH (e:Empresa {EmpresaID: $id}) DETACH DELETE e";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }

        // Método para adicionar um relacionamento entre a empresa e o emprego oferecido
        public async Task AdicionarRelacionamentoEmpregoAsync(int empresaId, int empregoId)
        {
            var sql = @"
                MATCH (e:Empresa {EmpresaID: $empresaId}), (em:Emprego {EmpregoID: $empregoId})
                CREATE (e)-[:OFERECE]->(em)";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { empresaId, empregoId });
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
                    ID = int.Parse(empresaNode.Properties["empresaID"].ToString()),
                    Nome = empresaNode.Properties["Nome"].ToString(),
                    Telefone = empresaNode.Properties["Telefone"].ToString(),
                    Senha = empresaNode.Properties["Senha"].ToString(),
                    Email = empresaNode.Properties["Email"].ToString(),
                    CNPJ = empresaNode.Properties["Cnpj"].ToString(),
                    SegmentoMercado = empresaNode.Properties["SegmentoMercado"].ToString(),
                    Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                };
            }

            return null;
        }
    }
    }
}