import axios from 'axios';

export default {
    async Criar(doador) {
        try {
            const response = await axios.post("http://localhost:5233/Doador/api/criar", {
                nome: doador.nome,
                cpf: doador.cpf,
                telefone: doador.telefone,
                dataNascimento: (() => {
                    const data = doador.dataNascimento ? new Date(doador.dataNascimento) : null;
                    return data instanceof Date && !isNaN(data) ? data.toISOString() : new Date().toISOString();
                })(),
                email: doador.email,
                senha: doador.senha,
                rua: doador.rua,
                bairro: doador.bairro,
                cidade: doador.cidade,
                estado: doador.estado,
                numero: parseInt(doador.numero) || 0,
                complemento: doador.complemento,
                cep: doador.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
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
            const response = await axios.post("http://localhost:5233/Doador/api/logar", {
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
            const response = await axios.get(`http://localhost:5233/Doador/api/obterPorId/${id}`);
            return response;
        }
        catch (error) {
            console.error('Erro ao buscar por ID:', error);
            throw error;
        }
    },
    async CarregarImagem(imagem,id){
        try {
            console.log("Tentou");
            const response = await axios.put(`http://localhost:5233/Doador/api/carregar-imagem/${id}`, {
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
            const response = await axios.put(`http://localhost:5233/Doador/api/trocar-senha/${id}`, {
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