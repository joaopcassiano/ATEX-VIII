import { useLocation } from 'react-router-dom';
import styles from './_consultaGeralBeneficiario.module.css';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';
import { BsBucket } from 'react-icons/bs';

const ConsultaGeralBeneficiario = () => {

    const location = useLocation();
    const usuario = location.state || {};

    return (
        <>
            <div className={styles.corpo}>
                <div className={styles.titulo_maior}>
                    Histórico geral
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.titulo}>
                            Sua última doação recebida:
                        </div>
                        <div className={styles.conteudo}>
                            <div className={styles.texto_adicional}>
                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add} >{usuario.doadores[0].nome}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add} >{usuario.doadores[0].email}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{usuario.doadores[0].itemDoado}</p>
                            </div>
                        </div>
                    </div>
                    <img src={usuario.doadores[0].perfil} alt='foto doador' className={styles.imagem}></img>
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.titulo}>
                            Último voluntário a te ajudar:
                        </div>
                        <div className={styles.conteudo}>
                            <div className={styles.texto_adicional}>
                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add} >{usuario.necessidades[0].nome}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add} >{usuario.necessidades[0].email}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{usuario.necessidades[0]?.necessidade}</p>
                            </div>
                        </div>
                    </div>
                    <img src={usuario.necessidades[0].perfil} alt='foto doador' className={styles.imagem}></img>
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.titulo}>
                            Emprego atual:
                        </div>
                        <div className={styles.conteudo}>
                            <div className={styles.texto_adicional}>
                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add} >{usuario.empregos[0].nome}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add} >{usuario.empregos[0].email}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{usuario.empregos[0].vaga}</p>
                            </div>
                        </div>
                    </div>
                    <img src={usuario.empregos[0].perfil} alt='foto doador' className={styles.imagem}></img>
                </div>
            </div>
        </>
    )
}

export default ConsultaGeralBeneficiario;