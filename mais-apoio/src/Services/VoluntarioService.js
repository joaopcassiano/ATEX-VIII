import axios from 'axios';

export default {
    async Criar(voluntario) {
        try {
            const response = await axios.post("http://localhost:5233/Voluntario/api/criar", {
                nome: voluntario.nome,
                cpf: voluntario.cpf,
                telefone: voluntario.telefone,
                dataNascimento: (() => {
                    const data = voluntario.dataNascimento ? new Date(voluntario.dataNascimento) : null;
                    return data instanceof Date && !isNaN(data) ? data.toISOString() : new Date().toISOString();
                })(),
                areaAtuacao: voluntario.areaDeAtuacao,
                email: voluntario.email,
                senha: voluntario.senha,
                rua: voluntario.rua,
                bairro: voluntario.bairro,
                cidade: voluntario.cidade,
                estado: voluntario.estado,
                numero: parseInt(voluntario.numero) || 0,
                complemento: voluntario.complemento,
                cep: voluntario.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
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
            const response = await axios.post("http://localhost:5233/Voluntario/api/logar", {
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
            const response = await axios.get(`http://localhost:5233/Voluntario/api/obterPorId/${id}`);
            return response;
        }
        catch (error) {
            console.error('Erro ao buscar por ID:', error);
            throw error;
        }
    },

    async ObterTodos() {
        try {
            const response = await axios.get(`http://localhost:5233/Voluntario/api/obter-todos`);
            return response;
        }
        catch (error) {
            console.error('Erro ao buscar:', error);
            throw error;
        }
    },
    
    async CarregarImagem(imagem,id){
        try {
            const response = await axios.put(`http://localhost:5233/Voluntario/api/carregar-imagem/${id}`, {
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
            const response = await axios.put(`http://localhost:5233/Voluntario/api/trocar-senha/${id}`, {
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