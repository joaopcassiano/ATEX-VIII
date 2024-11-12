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
            var sql = @"
                CREATE (v:Voluntario {ID: randomUUID(), Nome: $nome, AreaAtuacao: $areaAtuacao, 
                                      Disponibilidade: $disponibilidade, EnderecoID: $enderecoID, 
                                      Telefone: $telefone, Email: $email, Ativo: $ativo})
                RETURN v.ID as ID";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new
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
                return record["ID"].As<string>(); // Retorna o ID do voluntário criado
            }
        }

        // Obter todos os voluntários
        public async Task<List<Voluntario>> ObterTodosAsync()
        {
            var sql = "MATCH (v:Voluntario) RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql);
                var voluntarios = new List<Voluntario>();

                await result.ForEachAsync(record =>
                {
                    var voluntario = new Voluntario
                    {
                        ID = record["v"].As<INode>().Properties["ID"].ToString(),
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
            var sql = "MATCH (v:Voluntario {ID: $id}) RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new { id });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var voluntarioNode = record["v"].As<INode>();
                    return new Voluntario
                    {
                        ID = voluntarioNode.Properties["ID"].ToString(),
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
            var sql = @"
                MATCH (v:Voluntario {ID: $id})
                SET v.Nome = $nome, v.AreaAtuacao = $areaAtuacao, v.Disponibilidade = $disponibilidade,
                    v.EnderecoID = $enderecoID, v.Telefone = $telefone, v.Email = $email, v.Ativo = $ativo
                RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new
                {
                    id = voluntario.ID,
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
            var sql = "MATCH (v:Voluntario {ID: $id}) SET v.Ativo = false RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }
    }
}
