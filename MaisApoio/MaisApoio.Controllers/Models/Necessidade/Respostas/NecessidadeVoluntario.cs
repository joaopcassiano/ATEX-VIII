namespace MaisApoio.MaisApoio.Controllers.Models.Necessidade.Respostas
{
    public class NecessidadeVoluntario
    {
        public int NecessidadeID { get; set; }
        public string Descricao { get; set; }
        public DateTime DataRegistro { get; set; }
        public string Prioridade { get; set; }
        public int BeneficiarioID { get; set; }
        public int VoluntarioID { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? ImagemPerfil { get; set; }
        public string Cpf { get; set; }
        public string AreaAtuacao { get; set; }
        public bool Ativo { get; set; }

        public NecessidadeVoluntario() { }
    }
}