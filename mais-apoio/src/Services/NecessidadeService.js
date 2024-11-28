import axios from 'axios';

export default {
    async Criar(necessidade){
        try {
            const resposta = await axios.post("http://localhost:5233/Necessidade/api/criar",necessidade)
            return resposta;
        } catch (error) {
            console.error('Erro ao cadastrar a necessidade:', error);
            throw error;
        }
    },
    async ObterBeneficiario(id){
        try {
            const resposta = await axios.get(`http://localhost:5233/Necessidade/api/obter-por-beneficiario/${id}`)
            return resposta;
        } catch (error) {
            console.error('Erro ao obter voluntários:', error);
            console.log(error)
            throw error;
        }
    },
    async ObterVoluntario(id){
        try {
            const resposta = await axios.get(`http://localhost:5233/Necessidade/api/obter-por-voluntario/${id}`)
            return resposta;
        } catch (error) {
            console.error('Erro ao obter Beneficiários:', error);
            throw error;
        }
    }
}