import { Link } from 'react-router-dom';
import styles from './_topBarLog.module.css'
import logo from '../../assets/logo.png';
import Botao from '../Botao/Botao';


const TopBarLog = ({ usuario, tipoUsuario }) => {
    return (
        <>
            <div className={styles.topBar}>
                <Link
                    className={styles.linkLogo}
                    to={
                        tipoUsuario === 'Beneficiario' ?
                            '' : '/home'
                    }>
                    <Botao estilo='logoHome'>
                        <img src={logo} alt="Logo" className={styles.logoImagem} />
                    </Botao>
                </Link>
                <div className={styles.funcionalidades}>

                    <Link
                        className={styles.link}
                        to={
                            tipoUsuario === 'Voluntario' ? 'perfil' : '/home'
                        }
                        
                        state={usuario}>
                        <h3 className={styles.nomePerfil}> Olá {usuario.nome.split(" ")[0]}</h3>
                    </Link>

                    <Link
                        className={styles.link}
                        to={
                            tipoUsuario === 'Voluntario' ? 'perfil' : '/home'
                        }
                        state={usuario}>
                        <img src={usuario.perfil} className={styles.fotoPerfil}/>

                    </Link>
                </div>
            </div>
        </>
    )
}

export default TopBarLog;