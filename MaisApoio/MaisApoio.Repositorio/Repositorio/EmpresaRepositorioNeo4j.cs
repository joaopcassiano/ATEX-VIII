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
                CREATE (e:Empresa {ID: randomUUID(), Nome: $nome, Telefone: $telefone, 
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
                return record["ID"].As<string>(); // Retorna o ID da empresa criada
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
                        ID = int.Parse(record["e"].As<INode>().Properties["ID"].ToString()),
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
            var sql = "MATCH (e:Empresa {ID: $id}) RETURN e";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new { id });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var empresaNode = record["e"].As<INode>();
                    return new Empresa
                    {
                        ID = int.Parse(empresaNode.Properties["ID"].ToString()),
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
                    id = empresa.ID,
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
    }
}
