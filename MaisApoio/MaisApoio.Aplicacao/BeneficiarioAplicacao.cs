using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;
using MaisApoio.Service;

namespace MaisApoio.Aplicacao;

public class BeneficiarioAplicacao
{
    private BeneficiarioRepositorio _beneficiarioRepositorio;

    public BeneficiarioAplicacao(BeneficiarioRepositorio beneficiarioRepositorio)
    {
        _beneficiarioRepositorio = beneficiarioRepositorio;
    }

    public async Task CriarAsync(Beneficiario beneficiario)
    {

        if (beneficiario == null)
        {
            throw new Exception("Beneficiario não pode ser vazio");
        }

        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorEmailAsync(beneficiario.Email);

        if (beneficiarioObtido != null)
        {
            throw new Exception("Já existe um beneficiario com o mesmo email.");
        }

        await _beneficiarioRepositorio.CriarAsync(beneficiario);

        string mensagem = $@"
         <!DOCTYPE html>
         <html lang='pt-BR'>
         <head>
             <meta charset='UTF-8'>
             <style>
                 body {{
                     font-family: Arial, sans-serif;
                     background-color: #f4f4f4;
                     margin: 0;
                     padding: 0;
                 }}
                 .container {{
                     width: 100%;
                     max-width: 600px;
                     margin: 0 auto;
                     background-color: #ffffff;
                     border-radius: 8px;
                     overflow: hidden;
                     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                 }}
                 .header {{
                     background-color: #007bff;
                     padding: 20px;
                     text-align: center;
                 }}
                 .header img {{
                     width: 150px;
                 }}
                 .content {{
                     padding: 30px;
                 }}
                 .content h1 {{
                     color: #333333;
                     font-size: 24px;
                     margin-bottom: 10px;
                 }}
                 .content p {{
                     color: #555555;
                     line-height: 1.6;
                     margin-bottom: 20px;
                 }}
                 .code {{
                     display: block;
                     background-color: #f4f4f4;
                     padding: 10px;
                     text-align: center;
                     font-size: 20px;
                     letter-spacing: 2px;
                     color: #333333;
                     border-radius: 5px;
                     margin: 10px 0;
                 }}
                 .footer {{
                     background-color: #007bff;
                     padding: 10px;
                     text-align: center;
                     color: #ffffff;
                     font-size: 12px;
                 }}
             </style>
         </head>
         <body>
             <div class='container'>
                 <div class='header'>
                     <img src='cid:logo' alt='Logo da Empresa' style='width:150px;' />
                 </div>
                 <div class='content'>
                    <h1>Bem-vindo(a) ao +Apoio!</h1>
                    <p>É um prazer ter você conosco! O +Apoio é uma plataforma que acredita em uma sociedade mais justa e colaborativa. 
                    Nossa missão é oferecer suporte e esperança para aqueles que mais precisam, facilitando o acesso a recursos essenciais e promovendo a solidariedade.</p>
                    
                    <p>Ao se juntar a nós, você se torna parte de uma rede de apoio que conecta pessoas em situação de vulnerabilidade a doações de alimentos, roupas e produtos de higiene, além de incentivar o voluntariado e disponibilizar oportunidades de emprego para fomentar autonomia e desenvolvimento.</p>

                    <p>O +Apoio não é apenas um site; é um movimento que une empresas, organizações sociais e cidadãos comprometidos com uma cultura de inclusão e responsabilidade social. Juntos, estamos construindo uma sociedade mais solidária e igualitária.</p>

                    <p>Seja bem-vindo(a) a essa causa transformadora! Estamos muito felizes por você estar aqui.</p>
                 </div>
                 <div class='footer'>
                     <p>&copy; 2024. Todos os direitos reservados. Isso é apenas um site teste, de um trabalho de universidade.</p>
                 </div>
             </div>
         </body>
         </html>";
            
        EmailService.EnviarEmail(beneficiario.Email,"Cadastro no sistema +Apoio",mensagem);

    }

    public async Task AtualizarAsync(Beneficiario beneficiario)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorIdAsync(beneficiario.ID);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        if (beneficiario.Nome == null)
        {
            throw new Exception("Nome do beneficiario não pode ser vazio.");
        }

        beneficiarioObtido.Nome = beneficiario.Nome;
        beneficiarioObtido.Necessidade = beneficiario.Necessidade;
        beneficiarioObtido.CPF = beneficiario.CPF;
        beneficiarioObtido.Telefone = beneficiario.Telefone;
        beneficiarioObtido.Ativo = beneficiario.Ativo;
        beneficiarioObtido.SituacaoEconomica = beneficiario.SituacaoEconomica;
        beneficiarioObtido.DataNascimento = beneficiario.DataNascimento;

        await _beneficiarioRepositorio.AtualizarAsync(beneficiarioObtido);
    }

    public async Task ExcluirAsync(int id)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorIdAsync(id);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        beneficiarioObtido.Deletar();

        await _beneficiarioRepositorio.AtualizarAsync(beneficiarioObtido);
    }

    public async Task RestaurarAsync(int id)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorIdAsync(id);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        beneficiarioObtido.Restaurar();

        await _beneficiarioRepositorio.AtualizarAsync(beneficiarioObtido);
    }

    public async Task<List<Beneficiario>> ObterTodosAsync()
    {
        return await _beneficiarioRepositorio.ObterTodosAsync();
    }

    public async Task<Beneficiario> ObterPorEmailAsync(string email)
    {
        Beneficiario beneficiarioObtido =  await _beneficiarioRepositorio.ObterPorEmailAsync(email);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        return beneficiarioObtido;
    }

    public async Task<Beneficiario> ObterPorIdAsync(int id)
    {
        Beneficiario beneficiarioObtido =  await _beneficiarioRepositorio.ObterPorIdAsync(id);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Beneficiario não encontrado.");
        }

        return beneficiarioObtido;
    }

    public async Task CarregarImagemAsync(IFormFile file, int id)
    {
        await _beneficiarioRepositorio.CarregarImagemAsync(file, id);
    }

    public async Task<int> LogarAsync(string email, string senha)
    {
        Beneficiario beneficiarioObtido = await _beneficiarioRepositorio.ObterPorEmailAsync(email);

        if (beneficiarioObtido == null)
        {
            throw new Exception("Email não cadastrado");
        }

        Beneficiario beneficiario = await _beneficiarioRepositorio.LogarAsync(email,senha);

        if(beneficiario == null)
        {
            throw new Exception("Senha incorreta");
        }

        return beneficiario.ID;
    }

}