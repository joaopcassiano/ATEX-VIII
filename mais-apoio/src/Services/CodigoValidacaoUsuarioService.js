import axios from 'axios';

export default {
    async CriarCodigo(email, tipoUsuario) {
        try {
            console.log(tipoUsuario, email);
            const response = await axios.post(`http://localhost:5233/CodigoValidacaoUsuario/api/criar?tipoUsuario=${tipoUsuario}`, {
                email: email
            });
            return response;
        }
        catch (error) {
            console.error('Erro ao enviar código:', error);
            throw error;
        }
    },
    async ValidarCodigo(codigo, email, tipoUsuario) {
        try {
            const response = await axios.post(`http://localhost:5233/CodigoValidacaoUsuario/api/verificar-codigo?codigo=${tipoUsuario}`, {
                codigo: codigo,
                email: email
            });
            return response;
        }
        catch (error) {
            console.error('Erro ao validar código:', error);
            throw error;
        }
    }
}