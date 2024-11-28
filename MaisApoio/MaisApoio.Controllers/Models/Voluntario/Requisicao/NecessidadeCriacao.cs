namespace MaisApoio.MaisApoio.Controllers.Models.Voluntario.Requisicao
{
    public class NecessidadeCriacao
    {
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Rua { get; set; }
        public string Bairro { get; set; }
        public string Complemento { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Cep { get; set; }
        public int Numero { get; set; }
        public string Telefone { get; set; }
        public string AreaAtuacao { get; set; }

        public NecessidadeCriacao() { }
    }
}
