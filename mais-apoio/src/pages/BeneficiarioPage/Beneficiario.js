import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_beneficiario.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png'

const Beneficiario = () => {
    const user = {
        nome: 'Anderson',
        perfil: fotoPerfil
    }

    return (
        <div className={styles.corpo}>
            <TopBarLog usuario={user} tipoUsuario='Beneficiario'/>
        </div>
    )
}

export default Beneficiario;