namespace MaisApoio.MaisApoio.Controllers.Models.Necessidade.Requisicao
{
    public class NecessidadeCriacao
    {
        public string Descricao { get; set; }
        public string Prioridade { get; set; }
        public int BeneficiarioID { get; set; }
        public int VoluntarioID { get; set; }

        public NecessidadeCriacao() { }
    }
}
