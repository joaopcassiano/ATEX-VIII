import { Link } from 'react-router-dom';
import styles from './_topBarLog.module.css'
import logo from '../../assets/logo.png';
import Botao from '../Botao/Botao';
import { BsCamera } from "react-icons/bs";
import { useState } from 'react';

const TopBarLog = ({ usuario, tipoUsuario }) => {
    const [trocarfoto, setTrocarfoto] = useState(false);
    console.log("usuario aqui " , usuario);
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
                            tipoUsuario === 'Beneficiario' ?
                                'perfil' : '/home'
                        }

                        state={usuario}>
                        <h3 className={styles.nomePerfil}> Olá {usuario?.nome?.split(" ")[0]},</h3>
                    </Link>
                    <img src="https://drive.google.com/uc?id=1AYN7jYy7FR7RLCAR4V_LI9Ys2ubnTcV_" alt="perfil" className={styles.fotoPerfil}></img>

                    {
                        (
                            usuario?.imagemPerfil ?
                                <>
                                    <Link
                                        className={styles.link}
                                        to={
                                            tipoUsuario === 'Beneficiario' ?
                                                'perfil' : '/home'
                                        }
                                        state={usuario}>
                                        <img src="https://drive.google.com/uc?id=1AYN7jYy7FR7RLCAR4V_LI9Ys2ubnTcV_" className={styles.fotoPerfil}></img>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link
                                        to={"carregar-imagem"}
                                        className={styles.semFoto}
                                        state={{tipoUser: tipoUsuario, id: usuario.id}}>
                                        <BsCamera className={styles.camera}></BsCamera>
                                        Adicionar foto
                                    </Link>
                                </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TopBarLog;