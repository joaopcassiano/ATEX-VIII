import axios from 'axios';

export default {
    async Criar(empresa) {
        try {
            const response = await axios.post("http://localhost:5233/Empresa/api/criar", {
                nome: empresa.nome,
                cnpj: empresa.cnpj,
                telefone: empresa.telefone,
                segmentoMercado: empresa.segmentoMercado,
                email: empresa.email,
                senha: empresa.senha,
                rua: empresa.rua,
                bairro: empresa.bairro,
                cidade: empresa.cidade,
                estado: empresa.estado,
                numero: parseInt(empresa.numero) || 0,
                complemento: empresa.complemento,
                cep: empresa.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
            });
            console.log("Cadastro realizado com sucesso!");
            return response;

        } catch (error) {
            if (error.response) {
                console.error("Erro do servidor:", error.response.data);
            } else {
                console.error("Erro na requisição:", error.message);
            }
            throw error;
        }
    },

    async Logar(email, senha) {
        try {
            const response = await axios.post("http://localhost:5233/Empresa/api/logar", {
                email: email,
                senha: senha
            });

            return response;
        }
        catch (error) {
            console.error('Erro ao logar:', error);
            throw error;
        }
    },

    async ObterPorId(id) {
        try {
            const response = await axios.get(`http://localhost:5233/Empresa/api/obterPorId/${id}`);
            return response;
        }
        catch (error) {
            console.error('Erro ao buscar por ID:', error);
            throw error;
        }
    },

    async ObterTodos() {
        try {
            const response = await axios.get(`http://localhost:5233/Empresa/api/obter-todos`);
            return response;
        }
        catch (error) {
            console.error('Erro ao buscar:', error);
            throw error;
        }
    },
    
    async CarregarImagem(imagem,id){
        try {
            const response = await axios.put(`http://localhost:5233/Empresa/api/carregar-imagem/${id}`, {
                imagem: imagem
            });
            console.log(response)
        }
        catch (error) {
            console.error('Erro ao carregar imagem:', error);
            throw error;
        }
    },

    async TrocarSenha(id,confirmarSenha,senha){
        try {
            const response = await axios.put(`http://localhost:5233/Empresa/api/trocar-senha/${id}`, {
                confirmarSenha: confirmarSenha,
                senha: senha
            });
            console.log(response)
        }
        catch (error) {
            console.log(error)
            console.error('Erro ao trocar de senha:', error);
            throw error;
        }
    }
}