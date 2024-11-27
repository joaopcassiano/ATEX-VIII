import axios from 'axios';

export default {
    async Criar(empresa) {
        try {
            const response = await axios.post("http://localhost:5233/Empresa/api/criar", {
                nome: empresa.nome,
                cnpj: empresa.cnpj,  
                telefone: empresa.telefone,
                email: empresa.email,
                senha: empresa.senha,
                endereco: empresa.endereco,
                rua: empresa.rua,
                bairro: empresa.bairro,
                cidade: empresa.cidade,
                estado: empresa.estado,
                numero: parseInt(empresa.numero),
                complemento: empresa.complemento,
                cep: empresa.cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3")
            });

            console.log("Cadastro de empresa realizado com sucesso!");

        } catch (error) {
            if (error.response) {
                console.error("Erro do servidor:", error.response.data);
            } else {
                console.error("Erro na requisição:", error.message);
            }
        }
    },

    async Logar(email, senha) {
        const response = await axios.post("http://localhost:5233/Empresa/api/logar", {
            email: email,
            senha: senha
        });

        return response;
    },

    async ObterPorId(id) {
        const response = await axios.get(`http://localhost:5233/Empresa/api/obterPorId/${id}`);
        return response;
    }
}
