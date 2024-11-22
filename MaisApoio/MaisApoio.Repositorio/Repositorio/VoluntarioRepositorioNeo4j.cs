using Neo4j.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class VoluntarioRepositorio
    {
        private readonly MaisApoioContexto _banco;

        public VoluntarioRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        // Criar novo voluntário
        public async Task<int> CriarAsync(Voluntario voluntario)
        {
            var neo4j = @"
                CREATE (v:Voluntario {VoluntarioID: randomUUID(), Nome: $nome, AreaAtuacao: $areaAtuacao, 
                                      Disponibilidade: $disponibilidade, EnderecoID: $enderecoID, 
                                      Telefone: $telefone, Email: $email, Ativo: $ativo})
                RETURN v.VoluntarioID as ID";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new
                {
                    nome = voluntario.Nome,
                    areaAtuacao = voluntario.AreaAtuacao,
                    disponibilidade = voluntario.Disponibilidade,
                    enderecoID = voluntario.EnderecoID,
                    telefone = voluntario.Telefone,
                    email = voluntario.Email,
                    ativo = voluntario.Ativo
                });

                var record = await result.SingleAsync();
                return record["VoluntarioID"].As<string>(); // Retorna o ID do voluntário criado
            }
        }

        // Obter todos os voluntários
        public async Task<List<Voluntario>> ObterTodosAsync()
        {
            var neo4j = "MATCH (v:Voluntario) RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j);
                var voluntarios = new List<Voluntario>();

                await result.ForEachAsync(record =>
                {
                    var voluntario = new Voluntario
                    {
                        VoluntarioID = record["v"].As<INode>().Properties["VoluntarioID"].ToString(),
                        Nome = record["v"].As<INode>().Properties["Nome"].ToString(),
                        AreaAtuacao = record["v"].As<INode>().Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = record["v"].As<INode>().Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(record["v"].As<INode>().Properties["EnderecoID"].ToString()),
                        Telefone = record["v"].As<INode>().Properties["Telefone"].ToString(),
                        Email = record["v"].As<INode>().Properties["Email"].ToString(),
                        Ativo = bool.Parse(record["v"].As<INode>().Properties["Ativo"].ToString())
                    };
                    voluntarios.Add(voluntario);
                });

                return voluntarios;
            }
        }

        // Obter voluntário por ID
        public async Task<Voluntario> ObterPorIdAsync(string id)
        {
            var neo4j = "MATCH (v:Voluntario {VoluntarioID: $id}) RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { id });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var voluntarioNode = record["v"].As<INode>();
                    return new Voluntario
                    {
                        VoluntarioID = voluntarioNode.Properties["VoluntarioID"].ToString(),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = voluntarioNode.Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(voluntarioNode.Properties["EnderecoID"].ToString()),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    };
                }

                return null;
            }
        }

        // Atualizar voluntário
        public async Task AtualizarAsync(Voluntario voluntario)
        {
            var neo4j = @"
                MATCH (v:Voluntario {VoluntarioID: $id})
                SET v.Nome = $nome, v.AreaAtuacao = $areaAtuacao, v.Disponibilidade = $disponibilidade,
                    v.EnderecoID = $enderecoID, v.Telefone = $telefone, v.Email = $email, v.Ativo = $ativo
                RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(neo4j, new
                {
                    id = voluntario.VoluntarioID,
                    nome = voluntario.Nome,
                    areaAtuacao = voluntario.AreaAtuacao,
                    disponibilidade = voluntario.Disponibilidade,
                    enderecoID = voluntario.EnderecoID,
                    telefone = voluntario.Telefone,
                    email = voluntario.Email,
                    ativo = voluntario.Ativo
                });
            }
        }

        // Exclusão do voluntário (lógica de desativação)
        public async Task ExclusaoFisicaAsync(string id)
        {
            var neo4j = "MATCH (v:Voluntario {VoluntarioID: $id}) SET v.Ativo = false RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(neo4j, new { id });
            }
        }
        public async Task<Voluntario> ObterPorNomeAsync(string nome)
        {
            var neo4j = "MATCH (v:Voluntario {Nome: $nome}) RETURN v";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { nome });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var voluntarioNode = record["v"].As<INode>();
                    return new Voluntario
                    {
                        VoluntarioID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = voluntarioNode.Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(voluntarioNode.Properties["EnderecoID"].ToString()),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    };
                }
                return null;
            }
        }
        public async Task<List<Voluntario>> ObterPorAreaAtuacaoAsync(string areaAtuacao)
        {
            var neo4j = "MATCH (v:Voluntario {AreaAtuacao: $areaAtuacao}) RETURN v";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { areaAtuacao });
                var voluntarios = new List<Voluntario>();

                await result.ForEachAsync(record =>
                {
                    var voluntarioNode = record["v"].As<INode>();
                    voluntarios.Add(new Voluntario
                    {
                        VoluntarioID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = voluntarioNode.Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(voluntarioNode.Properties["EnderecoID"].ToString()),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    });
                });

                return voluntarios;
            }
        }
        public async Task<List<Voluntario>> ObterPorDisponibilidadeAsync(string disponibilidade)
        {
            var neo4j = "MATCH (v:Voluntario {Disponibilidade: $disponibilidade}) RETURN v";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { disponibilidade });
                var voluntarios = new List<Voluntario>();

                await result.ForEachAsync(record =>
                {
                    var voluntarioNode = record["v"].As<INode>();
                    voluntarios.Add(new Voluntario
                    {
                        VoluntarioID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = voluntarioNode.Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(voluntarioNode.Properties["EnderecoID"].ToString()),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    });
                });

                return voluntarios;
            }
        }
        public async Task<List<Voluntario>> ObterPorTelefoneAsync(decimal telefone)
        {
            var neo4j = "MATCH (v:Voluntario {Telefone: $telefone}) RETURN v";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { telefone });
                var voluntarios = new List<Voluntario>();

                await result.ForEachAsync(record =>
                {
                    var voluntarioNode = record["v"].As<INode>();
                    voluntarios.Add(new Voluntario
                    {
                        VoluntarioID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = voluntarioNode.Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(voluntarioNode.Properties["EnderecoID"].ToString()),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    });
                });
                return voluntarios;
            }
        }

        public async Task<List<Voluntario>> ObterPorEmailAsync(string email)
        {
            var neo4j = "MATCH (v:Voluntario {Email: $email}) RETURN v";
            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(neo4j, new { email });
                var voluntarios = new List<Voluntario>();

                await result.ForEachAsync(record =>
                {
                    var voluntarioNode = record["v"].As<INode>();
                    voluntarios.Add(new Voluntario
                    {
                        VoluntarioID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Disponibilidade = voluntarioNode.Properties["Disponibilidade"].ToString(),
                        EnderecoID = int.Parse(voluntarioNode.Properties["EnderecoID"].ToString()),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    });
                });
                return voluntarios;
            }
        }
    }
}
