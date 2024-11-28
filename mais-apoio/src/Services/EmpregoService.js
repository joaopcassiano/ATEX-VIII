import axios from 'axios';

export default {
    async Criar(emprego){
        try {
            const resposta = await axios.post("http://localhost:5233/Emprego/api/criar",emprego)
            return resposta;
        } catch (error) {
            console.error('Erro ao cadastrar o empregado:', error);
            throw error;
        }
    },
    async ObterBeneficiario(id){
        try {
            const resposta = await axios.get(`http://localhost:5233/Emprego/api/obter-por-beneficiario/${id}`)
            return resposta;
        } catch (error) {
            console.error('Erro ao obter empregos:', error);
            console.log(error)
            throw error;
        }
    },
    async ObterEmpresa(id){
        try {
            const resposta = await axios.get(`http://localhost:5233/Emprego/api/obter-por-empresa/${id}`)
            return resposta;
        } catch (error) {
            console.error('Erro ao obter empregados:', error);
            throw error;
        }
    }
}