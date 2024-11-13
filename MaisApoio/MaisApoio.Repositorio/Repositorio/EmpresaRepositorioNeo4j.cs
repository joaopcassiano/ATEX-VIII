using Neo4j.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        // Criar nova empresa
        public async Task<int> CriarAsync(Empresa empresa)
        {
            var sql = @"
                CREATE (e:Empresa {EmpresaID: randomUUID(), Nome: $nome, Telefone: $telefone, 
                                    Email: $email, EnderecoID: $enderecoID, CNPJ: $cnpj, Ativo: $ativo})
                RETURN e.ID as ID";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new
                {
                    nome = empresa.Nome,
                    telefone = empresa.Telefone,
                    email = empresa.Email,
                    enderecoID = empresa.EnderecoID,
                    cnpj = empresa.CNPJ,
                    ativo = empresa.Ativo
                });

                var record = await result.SingleAsync();
                return record["EmpresaID"].As<string>(); // Retorna o ID da empresa criada
            }
        }

        // Obter todas as empresas
        public async Task<List<Empresa>> ObterTodosAsync()
        {
            var sql = "MATCH (e:Empresa) RETURN e";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql);
                var empresas = new List<Empresa>();

                await result.ForEachAsync(record =>
                {
                    var empresa = new Empresa
                    {
                        EmpresaID = int.Parse(record["e"].As<INode>().Properties["EmpresaID"].ToString()),
                        Nome = record["e"].As<INode>().Properties["Nome"].ToString(),
                        Telefone = record["e"].As<INode>().Properties["Telefone"].ToString(),
                        Email = record["e"].As<INode>().Properties["Email"].ToString(),
                        EnderecoID = int.Parse(record["e"].As<INode>().Properties["EnderecoID"].ToString()),
                        CNPJ = record["e"].As<INode>().Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(record["e"].As<INode>().Properties["Ativo"].ToString())
                    };
                    empresas.Add(empresa);
                });

                return empresas;
            }
        }

        // Obter empresa por ID
        public async Task<Empresa> ObterPorIdAsync(int id)
        {
            var sql = "MATCH (e:Empresa {EmpresaID: $id}) RETURN e";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new { id });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        EmpresaID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(empresaNode.Properties["EnderecoID"].ToString()),
                        CNPJ = empresaNode.Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }

                return null;
            }
        }

        // Atualizar empresa
        public async Task AtualizarAsync(Empresa empresa)
        {
            var sql = @"
                MATCH (e:Empresa {ID: $id})
                SET e.Nome = $nome, e.Telefone = $telefone, e.Email = $email, 
                    e.EnderecoID = $enderecoID, e.CNPJ = $cnpj, e.Ativo = $ativo
                RETURN e";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new
                {
                    id = empresa.EmpresaID,
                    nome = empresa.Nome,
                    telefone = empresa.Telefone,
                    email = empresa.Email,
                    enderecoID = empresa.EnderecoID,
                    cnpj = empresa.CNPJ,
                    ativo = empresa.Ativo
                });
            }
        }

        // Exclusão da empresa (lógica de desativação)
        public async Task ExclusaoFisicaAsync(int id)
        {
            var sql = "MATCH (e:Empresa {ID: $id}) SET e.Ativo = false RETURN e";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }

        // ----->>>>>   Consultas por Empresa
        // Obter todas as empresas
        public async Task<List<Empresa>> ObterPorNomeAsync()
        {
            var neo4j = "MATCH (e:Empresa) RETURN e";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j);
                var empresas = new List<Empresa>();
            using (var session = _banco.ConectarNeo4j())
            }
        }
        public async Task<Empresa> ObterPorNomeAsync(string nome)
        {
            var neo4j = "MATCH (e:Empresa {Nome: $nome}) RETURN e";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { nome });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        EmpresaID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(empresaNode.Properties["EnderecoID"].ToString()),
                        CNPJ = empresaNode.Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }
                return null;
            }
        }
        public async Task<Empresa> ObterPorCNPJAsync(string cnpj)
        {
            var neo4j = "MATCH (e:Empresa {CNPJ: $cnpj}) RETURN e";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { cnpj });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        EmpresaID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(empresaNode.Properties["EnderecoID"].ToString()),
                        CNPJ = empresaNode.Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }
                return null;
            }
        }
        public async Task<Empresa> ObterPorEnderecoAsync(int enderecoID)
        {
            var neo4j = "MATCH (e:Empresa {EnderecoID: $enderecoID}) RETURN e";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { enderecoID });
                var record = await result.SingleOrDefaultAsync();
                if (record!= null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        EmpresaID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(empresaNode.Properties["EnderecoID"].ToString()),
                        CNPJ = empresaNode.Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }
                return null;
            }
        }
        public async Task<Empresa> ObterPorEmailAsync(string email)
        {
            var neo4j = "MATCH (e:Empresa {Email: $email}) RETURN e";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { email });
                var record = await result.SingleOrDefaultAsync();
                if (record!= null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        EmpresaID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(empresaNode.Properties["EnderecoID"].ToString()),
                        CNPJ = empresaNode.Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }
                return null;
            }
        }
        public async Task<Empresa> ObterPorTelefoneAsync(string telefone)
        {
            var neo4j = "MATCH (e:Empresa {Telefone: $telefone}) RETURN e";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { telefone });
                var record = await result.SingleOrDefaultAsync();
                if (record!= null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        EmpresaID = int.Parse(empresaNode.Properties["EmpresaID"].ToString()),
                        Nome = empresaNode.Properties["Nome"].ToString(),
                        Telefone = empresaNode.Properties["Telefone"].ToString(),
                        Email = empresaNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(empresaNode.Properties["EnderecoID"].ToString()),
                        CNPJ = empresaNode.Properties["CNPJ"].ToString(),
                        Ativo = bool.Parse(empresaNode.Properties["Ativo"].ToString())
                    };
                }
                return null;
            }
        }
        
    }

}
