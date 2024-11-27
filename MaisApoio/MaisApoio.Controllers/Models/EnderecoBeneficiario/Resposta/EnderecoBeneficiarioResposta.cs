using MaisApoio.MaisApoio.Dominio.Entidades;

namespace MaisApoio.Models.EnderecoBeneficiario.Resposta;

public class EnderecoBeneficiarioResposta
{
    public int ID { get; set; }
    public string Rua { get; set; }
    public string Bairro { get; set; }
    public int Numero { get; set; }
    public string Complemento { get; set; }
    public string Cidade { get; set; }
    public string Estado { get; set; }
    public string Cep { get; set; }

    public EnderecoBeneficiarioResposta(MaisApoio.Dominio.Entidades.EnderecoBeneficiario enderecoBeneficiario)
    {
        ID = enderecoBeneficiario.ID;
        Rua = enderecoBeneficiario.Rua;
        Bairro = enderecoBeneficiario.Bairro;
        Numero = enderecoBeneficiario.Numero;
        Complemento = enderecoBeneficiario.Complemento;
        Cidade = enderecoBeneficiario.Cidade;
        Estado = enderecoBeneficiario.Estado;
        Cep = enderecoBeneficiario.Cep;
    }
}