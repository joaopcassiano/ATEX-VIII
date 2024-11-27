import axios from 'axios';

export default {
    async Criar(beneficiario) {
        try {
            const response = await axios.post("http://localhost:5233/Beneficiario/api/criar", {
                nome: beneficiario.nome,
                cpf: beneficiario.cpf,
                telefone: beneficiario.telefone,
                dataNascimento: (() => {
                    const data = beneficiario.dataNascimento ? new Date(beneficiario.dataNascimento) : null;
                    return data instanceof Date && !isNaN(data) ? data.toISOString() : new Date().toISOString();
                })(),
                situacaoEconomica: parseFloat(beneficiario.situacaoEconomica.replace("R$ ", '').replace(".", '').replace(",", '.') || 0),
                email: beneficiario.email,
                senha: beneficiario.senha,
                necessidade: beneficiario.necessidade,
                rua: beneficiario.rua,
                bairro: beneficiario.bairro,
                cidade: beneficiario.cidade,
                estado: beneficiario.estado,
                numero: parseInt(beneficiario.numero) || 0,
                complemento: beneficiario.complemento,
                cep: beneficiario.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
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
            const response = await axios.post("http://localhost:5233/Beneficiario/api/logar", {
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
            const response = await axios.get(`http://localhost:5233/Beneficiario/api/obterPorId/${id}`);
            return response;
        }
        catch (error) {
            console.error('Erro ao buscar por ID:', error);
            throw error;
        }
    },
    async CarregarImagemo(imagem,id){
        try {
            const response = await axios.put(`http://localhost:5233/Beneficiario/api/carregar-imagem/${id}`, {
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
            const response = await axios.put(`http://localhost:5233/Beneficiario/api/trocar-senha/${id}`, {
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