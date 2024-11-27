import axios from 'axios';

export default {
    async Criar(doacao){
        try {
            const resposta = await axios.post("http://localhost:5233/Doacao/api/criar",{
                doadorId: doacao.doadorId,
                beneficiarioId: doacao.beneficiarioId,
                quantidade: doacao.quantidade,
                descricaoDoacao: doacao.descricaoDoacao
            })
            return resposta;
        } catch (error) {
            console.error('Erro ao cadastrar doação:', error);
            throw error;
        }
    },
    async ObterDoador(id){
        try {
            const resposta = await axios.get(`http://localhost:5233/Doacao/api/obter-por-doador/${id}`)
            return resposta;
        } catch (error) {
            console.error('Erro ao obter doação:', error);
            console.log(error)
            throw error;
        }
    },
    async ObterBeneficiario(id){
        try {
            const resposta = await axios.get(`http://localhost:5233/Doacao/api/obter-por-beneficiario/${id}`)
            return resposta;
        } catch (error) {
            console.error('Erro ao obter doação:', error);
            throw error;
        }
    }
}