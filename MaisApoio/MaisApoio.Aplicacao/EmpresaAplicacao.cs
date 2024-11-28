using MaisApoio.MaisApoio.Dominio.Entidades;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

namespace MaisApoio.Aplicacao;

public class EmpresaAplicacao
{
    private EmpresaRepositorio _empresaRepositorio;

    public EmpresaAplicacao(EmpresaRepositorio empresaRepositorio)
    {
        _empresaRepositorio = empresaRepositorio;
    }

    public async Task<int> CriarAsync(Empresa empresa)
    {   

        if (empresa == null)
        {
            throw new Exception("Empresa não pode ser vazio");
        }

        Empresa empresaObtido = await _empresaRepositorio.ObterPorEmailAsync(empresa.Email);

        if (empresaObtido != null)
        {
            throw new Exception("Já existe um empresa com o mesmo email.");
        }

        return await _empresaRepositorio.CriarAsync(empresa);

    }

   
    public async Task AtualizarAsync(Empresa empresa)
    {
        Empresa empresaObtido = await _empresaRepositorio.ObterPorIdAsync(empresa.ID);

        if (empresaObtido == null)
        {
            throw new Exception("Empresa não encontrada.");
        }

        if (empresa.Nome == null)
        {
            throw new Exception("Nome da Empresa não pode ser vazio.");
        }

        empresaObtido.Nome = empresa.Nome;
        empresaObtido.CNPJ = empresa.CNPJ;
        empresaObtido.Email = empresa.Email;
        empresaObtido.Ativo = empresa.Ativo;
        empresaObtido.SegmentoMercado = empresa.SegmentoMercado;
        empresaObtido.Telefone = empresa.Telefone;

        await _empresaRepositorio.AtualizarAsync(empresaObtido);
    }

    public async Task ExcluirAsync(int id)
    {
        Empresa empresaObtido = await _empresaRepositorio.ObterPorIdAsync(id);

        if (empresaObtido == null)
        {
            throw new Exception("Empresa não encontrado.");
        }

        empresaObtido.Deletar();

        await _empresaRepositorio.AtualizarAsync(empresaObtido);
    }

    public async Task RestaurarAsync(int id)
    {
            Empresa empresaObtido = await _empresaRepositorio.ObterPorIdAsync(id);

        if (empresaObtido == null)
        {
            throw new Exception("Empresa não encontrada.");
        }

        empresaObtido.Restaurar();

        await _empresaRepositorio.AtualizarAsync(empresaObtido);
    }

    public async Task<List<Empresa>> ObterTodosAsync()
    {
        return await _empresaRepositorio.ObterTodosAsync();
    }

    public async Task<Empresa> ObterPorEmailAsync(string email)
    {
        Empresa empresaObtido = await _empresaRepositorio.ObterPorEmailAsync(email);

        if (empresaObtido == null)
        {
            throw new Exception("Empresa não encontrado.");
        }

        return empresaObtido;
    }

    public async Task<Empresa> ObterPorIdAsync(int id)
    {
        Empresa empresaObtido = await _empresaRepositorio.ObterPorIdAsync(id);

        if (empresaObtido == null)
        {
            throw new Exception("Empresa não encontrado.");
        }

        return empresaObtido;
    }

    public async Task<List<Empresa>> ObterPorSegmentoAsync(string segmento)
    {
        return await _empresaRepositorio.ObterPorSegmentoAsync(segmento);
    }
    

    public async Task CarregarImagemAsync(string imagem, int id)
    {
        if(imagem == null)
        {
            throw new Exception("Imagem não pode ser vazia.");
        }

        var empresaID = await _empresaRepositorio.ObterPorIdAsync(id);

        if(empresaID == null)
        {
            throw new Exception("Empresa não encontrado.");
        }

        await _empresaRepositorio.CarregarImagemAsync(imagem, id);
    }


    public async Task ExclusaoFisicaAsync(int id){
        await _empresaRepositorio.ExclusaoFisicaAsync(id);
    }
    
    public async Task<int> LogarAsync(string email, string senha)
    {
        Empresa empresaObtido = await _empresaRepositorio.ObterPorEmailAsync(email);

        if (empresaObtido == null)
        {
            throw new Exception("Email não cadastrado");
        }

        Empresa empresa = await _empresaRepositorio.LogarAsync(email, senha);

        if (empresa == null)
        {
            throw new Exception("Senha incorreta");
        }

        return empresa.ID;
    }

}