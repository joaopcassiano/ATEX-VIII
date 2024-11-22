import axios from 'axios';

export default {
    async Criar(beneficiario) {
        try {
            const response = await axios.post("http://localhost:5233/Beneficiario/api/criar", {
                nome: beneficiario.nome,
                cpf: beneficiario.cpf,
                telefone: beneficiario.telefone,
                dataNascimento: new Date(beneficiario.dataNascimento).toISOString(),
                situacaoEconomica: parseFloat(beneficiario.situacaoEconomica.replace("R$ ", '').replace(".", '').replace(",", '.')),
                email: beneficiario.email,
                senha: beneficiario.senha,
                necessidade: beneficiario.necessidade,
                rua: beneficiario.rua,
                bairro: beneficiario.bairro,
                cidade: beneficiario.cidade,
                estado: beneficiario.estado,
                numero: parseInt(beneficiario.numero),
                complemento: beneficiario.complemento,
                cep: beneficiario.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
            });

            console.log("Cadastro realizado com sucesso!");

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
    }
}