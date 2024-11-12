import { Link } from 'react-router-dom';
import styles from './_topBarLog.module.css'
import logo from '../../assets/logo.png';
import Botao from '../Botao/Botao';


const TopBarLog = ({ usuario, tipoUsuario }) => {
    return (
        <>
            <div className={styles.topBar}>
                <Link
                    className={styles.link}
                    to={
                        tipoUsuario === 'Beneficiario' ?
                            '/home/apresentacao' : '/home'
                    }>
                    <Botao estilo='logoHome'>
                        <img src={logo} alt="Logo" className={styles.logoImagem} />
                    </Botao>
                </Link>
                <div className={styles.funcionalidades}>
                    <h3 className={styles.nomePerfil}> Olá {usuario.nome},</h3>
                    <img src={usuario.perfil} className={styles.fotoPerfil}></img>
                </div>
            </div>
        </>
    )
}

export default TopBarLog;