namespace MaisApoio.MaisApoio.Controllers.Models.Voluntario.Resposta
{
    public class VoluntarioLogado
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string? ImagemPerfil { get; set; }
        public bool Ativo { get; set; }

        public VoluntarioLogado() { }
        public VoluntarioLogado(MaisApoio.Dominio.Entidades.Voluntario voluntario)
        {
            Id = voluntario.ID;
            Nome = voluntario.Nome;
            Cpf = voluntario.CPF;
            Telefone = voluntario.Telefone;
            DataNascimento = voluntario.DataNascimento;
            Email = voluntario.Email;
            ImagemPerfil = voluntario.ImagemPerfil;
            Ativo = voluntario.Ativo;
        }
    }
}
