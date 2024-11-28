using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;
using Neo4j.Driver;
using System.Xml.Linq;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class VoluntarioRepositorio
    {
        private readonly MaisApoioContexto _banco;

        public VoluntarioRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        public async Task CarregarImagemAsync(string imagemPerfil, int id)
        {
            string sql = "MATCH (v:Voluntario {VoluntarioID: $id}) SET v.ImagemPerfil = $imagemPerfil";

            using var session = _banco.ConectarNeo4j();

            await session.RunAsync(sql, new { id, imagemPerfil });
        }

        public async Task<Voluntario> LogarAsync(string email, string senha)
        {
            string cypher = @"
            MATCH (v:Voluntario {Email: $email, Senha: $senha})
            RETURN v.VoluntarioID AS ID, v.Nome AS Nome, v.Email AS Email, 
            v.Telefone AS Telefone, v.AreaAtuacao AS AreaAtuacao, v.Cpf AS Cpf, v.DataNascimento AS DataNascimento, v.ImagemPerfil AS ImagemPerfil,
            v.Ativo AS Ativo";

            using (var conexao = _banco.ConectarNeo4j())
            {
                var voluntariobanco = await conexao.RunAsync(cypher, new { email, senha });
                var voluntario = (await voluntariobanco.ToListAsync()).FirstOrDefault();

                if (voluntario != null)
                {
                    return new Voluntario
                    {
                        ID = voluntario["ID"].As<int>(),
                        Nome = voluntario["Nome"].As<string>(),
                        Email = voluntario["Email"].As<string>(),
                        Telefone = voluntario["Telefone"].As<string>(),
                        DataNascimento = voluntario["DataNascimento"].As<DateTime>(),
                        AreaAtuacao = voluntario["AreaAtuacao"].As<string>(),
                        CPF = voluntario["Cpf"].As<string>(),
                        ImagemPerfil = voluntario["ImagemPerfil"].As<string>(),
                        Ativo = voluntario["Ativo"].As<bool>()
                    };
                }

                return null; // Retorna null se o login não for encontrado
            }
        }

        public async Task<int> CriarAsync(Voluntario voluntario)
        {
            var sql = @"
            MATCH (s:Sequencia {tipo: 'Voluntario'})
            SET s.ultimoID = s.ultimoID + 1
            WITH s.ultimoID AS novoID
            CREATE (v:Voluntario {
                VoluntarioID: novoID, 
                Nome: $nome, 
                Telefone: $telefone, 
                Email: $email, 
                Senha: $senha, 
                DataNascimento: $dataNascimento, 
                AreaAtuacao: $areaAtuacao,
                Cpf: $cpf, 
                Ativo: $ativo
            })
            RETURN v.VoluntarioID AS ID";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new
                {
                    nome = voluntario.Nome,
                    telefone = voluntario.Telefone,
                    dataNascimento = voluntario.DataNascimento.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
                    cpf = voluntario.CPF,
                    email = voluntario.Email,
                    senha = voluntario.Senha,
                    areaAtuacao = voluntario.AreaAtuacao,
                    ativo = voluntario.Ativo
                });

                var record = await result.SingleAsync();
                return record["ID"].As<int>();
            }
        }

        public async Task<List<Voluntario>> ObterTodosAsync()
        {
            var sql = "MATCH (v:Voluntario) RETURN v";

            using (var conexao = _banco.ConectarNeo4j())
            {
                var voluntariosBanco = await conexao.RunAsync(sql);
                var voluntarios = new List<Voluntario>();

                await voluntariosBanco.ForEachAsync(record =>
                {
                    var voluntario = new Voluntario
                    {
                        ID = int.Parse(record["v"].As<INode>().Properties["VoluntarioID"].ToString()),
                        Nome = record["v"].As<INode>().Properties["Nome"].ToString(),
                        Telefone = record["v"].As<INode>().Properties["Telefone"].ToString(),
                        Email = record["v"].As<INode>().Properties["Email"].ToString(),
                        Senha = record["v"].As<INode>().Properties["Senha"].ToString(),
                        AreaAtuacao = record["v"].As<INode>().Properties["AreaAtuacao"].ToString(),
                        CPF = record["v"].As<INode>().Properties["Cpf"].ToString(),
                        DataNascimento = DateTime.Parse(record["v"].As<INode>().Properties["DataNascimento"].ToString()),
                        Ativo = bool.Parse(record["v"].As<INode>().Properties["Ativo"].ToString()),
                        ImagemPerfil = record["v"].As<INode>().Properties.ContainsKey("ImagemPerfil")
                            ? record["v"].As<INode>().Properties["ImagemPerfil"].ToString()
                            : null
                    };

                    voluntarios.Add(voluntario);
                });

                return voluntarios;
            }
        }


        public async Task<Voluntario> ObterPorIdAsync(int id)
        {
            var sql = "MATCH (v:Voluntario {VoluntarioID: $id}) RETURN v";

            using (var conexao = _banco.ConectarNeo4j())
            {
                var voluntarioBanco = await conexao.RunAsync(sql, new { id });
                var necessidade = (await voluntarioBanco.ToListAsync()).FirstOrDefault();

                if (necessidade != null)
                {
                    var voluntarioNode = necessidade["v"].As<INode>();

                    return new Voluntario
                    {
                        ID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        Senha = voluntarioNode.Properties["Senha"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        CPF = voluntarioNode.Properties["Cpf"].ToString(),
                        DataNascimento = DateTime.Parse(voluntarioNode.Properties["DataNascimento"].ToString()),
                        ImagemPerfil = voluntarioNode.Properties.ContainsKey("ImagemPerfil")
                        ? voluntarioNode.Properties["ImagemPerfil"].ToString()
                        : null,
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString())
                    };
                }

                return null;
            }
        }

        public async Task AtualizarAsync(Voluntario voluntario)
        {
            var sql = @"
                MATCH (d:Voluntario {VoluntarioID: $id})
                SET d.Nome = $nome, d.Telefone = $telefone, d.AreaAtuacao = $areaAtuacao, d.DataNascimento = $dataNascimento, d.Cpf = $cpf, d.Senha = $senha, d.Email = $email, d.Ativo = $ativo
                RETURN d";

            using (var conexao = _banco.ConectarNeo4j())
            {
                await conexao.RunAsync(sql, new
                {
                    id = voluntario.ID,
                    nome = voluntario.Nome,
                    telefone = voluntario.Telefone,
                    cpf = voluntario.CPF,
                    email = voluntario.Email,
                    areaAtuacao = voluntario.AreaAtuacao,
                    senha = voluntario.Senha,
                    dataNascimento = voluntario.DataNascimento.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
                    ativo = voluntario.Ativo
                });
            }
        }

        public async Task ExclusaoLogicaAsync(int id)
        {
            var sql = "MATCH (v:Voluntario {VoluntarioID: $id}) SET v.Ativo = false RETURN v";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }

        public async Task ExclusaoFisicaAsync(int id)
        {
            var sql = "MATCH (v:Voluntario {VoluntarioID: $id}) DETACH DELETE v";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }

        public async Task<Voluntario> ObterPorEmailAsync(string email)
        {
            var neo4j = "MATCH (v:Voluntario {Email: $email}) RETURN v";
            using (var conexao = _banco.ConectarNeo4j())
            {
                var voluntarioBanco = await conexao.RunAsync(neo4j, new { email });
                var voluntario = (await voluntarioBanco.ToListAsync()).FirstOrDefault();

                if (voluntario != null)
                {
                    var voluntarioNode = voluntario["v"].As<INode>();
                    return new Voluntario
                    {
                        ID = int.Parse(voluntarioNode.Properties["VoluntarioID"].ToString()),
                        Nome = voluntarioNode.Properties["Nome"].ToString(),
                        CPF = voluntarioNode.Properties["Cpf"].ToString(),
                        Telefone = voluntarioNode.Properties["Telefone"].ToString(),
                        AreaAtuacao = voluntarioNode.Properties["AreaAtuacao"].ToString(),
                        Senha = voluntarioNode.Properties["Senha"].ToString(),
                        Email = voluntarioNode.Properties["Email"].ToString(),
                        DataNascimento = DateTime.Parse(voluntarioNode.Properties["DataNascimento"].ToString()),
                        Ativo = bool.Parse(voluntarioNode.Properties["Ativo"].ToString()),
                        ImagemPerfil = voluntarioNode.Properties.ContainsKey("ImagemPerfil")
                        ? voluntarioNode.Properties["ImagemPerfil"].ToString()
                        : null,
                    };
                }
                return null;
            }
        }
    }
}
