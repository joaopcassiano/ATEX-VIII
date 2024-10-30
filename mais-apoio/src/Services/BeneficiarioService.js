import axios from 'axios';

export default {
    async Criar(beneficiario) {
        try {
            const response = await axios.post("http://localhost:5233/Beneficiario/api/criar", {
                nome: beneficiario.nome,
                cpf: beneficiario.cpf,
                telefone: beneficiario.telefone,
                dataNascimento: new Date(beneficiario.dataNascimento).toISOString(),
                situacaoEconomica: parseFloat(beneficiario.situacaoEconomica), // Força decimal
                email: beneficiario.email,
                senha: beneficiario.senha,
                rua: beneficiario.rua,
                bairro: beneficiario.bairro,
                cidade: beneficiario.cidade,
                estado: beneficiario.estado,
                numero: parseInt(beneficiario.numero), // Força inteiro
                complemento: beneficiario.complemento,
                cep: beneficiario.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
            });
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Erro do servidor:", error.response.data);
            } else {
                console.error("Erro na requisição:", error.message);
            }
        }
    }
    
}