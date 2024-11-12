using Neo4j.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Contexto;

namespace MaisApoio.MaisApoio.Repositorio.Repositorio
{
    public class DoadorRepositorio
    {
        private readonly MaisApoioContexto _banco;

        public DoadorRepositorio()
        {
            _banco = new MaisApoioContexto();
        }

        // Criar novo doador
        public async Task<int> CriarAsync(Doador doador)
        {
            var sql = @"
                CREATE (d:Doador {ID: randomUUID(), Nome: $nome, Telefone: $telefone, 
                                  Email: $email, EnderecoID: $enderecoID, Ativo: $ativo})
                RETURN d.ID as ID";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new
                {
                    nome = doador.Nome,
                    telefone = doador.Telefone,
                    email = doador.Email,
                    enderecoID = doador.EnderecoID,
                    ativo = doador.Ativo
                });

                var record = await result.SingleAsync();
                return record["ID"].As<string>(); // Retorna o ID do doador criado
            }
        }

        // Obter todos os doadores
        public async Task<List<Doador>> ObterTodosAsync()
        {
            var sql = "MATCH (d:Doador) RETURN d";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql);
                var doadores = new List<Doador>();

                await result.ForEachAsync(record =>
                {
                    var doador = new Doador
                    {
                        ID = int.Parse(record["d"].As<INode>().Properties["ID"].ToString()),
                        Nome = record["d"].As<INode>().Properties["Nome"].ToString(),
                        Telefone = record["d"].As<INode>().Properties["Telefone"].ToString(),
                        Email = record["d"].As<INode>().Properties["Email"].ToString(),
                        EnderecoID = int.Parse(record["d"].As<INode>().Properties["EnderecoID"].ToString()),
                        Ativo = bool.Parse(record["d"].As<INode>().Properties["Ativo"].ToString())
                    };
                    doadores.Add(doador);
                });

                return doadores;
            }
        }

        // Obter doador por ID
        public async Task<Doador> ObterPorIdAsync(int id)
        {
            var sql = "MATCH (d:Doador {ID: $id}) RETURN d";

            using (var session = _banco.ConectarNeo4j())
            {
                var result = await session.RunAsync(sql, new { id });
                var record = await result.SingleOrDefaultAsync();

                if (record != null)
                {
                    var doadorNode = record["d"].As<INode>();
                    return new Doador
                    {
                        ID = int.Parse(doadorNode.Properties["ID"].ToString()),
                        Nome = doadorNode.Properties["Nome"].ToString(),
                        Telefone = doadorNode.Properties["Telefone"].ToString(),
                        Email = doadorNode.Properties["Email"].ToString(),
                        EnderecoID = int.Parse(doadorNode.Properties["EnderecoID"].ToString()),
                        Ativo = bool.Parse(doadorNode.Properties["Ativo"].ToString())
                    };
                }

                return null;
            }
        }

        // Atualizar doador
        public async Task AtualizarAsync(Doador doador)
        {
            var sql = @"
                MATCH (d:Doador {ID: $id})
                SET d.Nome = $nome, d.Telefone = $telefone, d.Email = $email, 
                    d.EnderecoID = $enderecoID, d.Ativo = $ativo
                RETURN d";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new
                {
                    id = doador.ID,
                    nome = doador.Nome,
                    telefone = doador.Telefone,
                    email = doador.Email,
                    enderecoID = doador.EnderecoID,
                    ativo = doador.Ativo
                });
            }
        }

        // Exclusão do doador (lógica de desativação)
        public async Task ExclusaoFisicaAsync(int id)
        {
            var sql = "MATCH (d:Doador {ID: $id}) SET d.Ativo = false RETURN d";

            using (var session = _banco.ConectarNeo4j())
            {
                await session.RunAsync(sql, new { id });
            }
        }
    }
}
