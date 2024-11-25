import { Link, useLocation, useOutletContext } from 'react-router-dom';
import styles from './_perfil.module.css';
import Botao from '../Botao/Botao';
import { CiCalendar } from 'react-icons/ci';
import { BsArrowReturnRight, BsBucket, BsCamera, BsEnvelopeAt } from 'react-icons/bs';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';

const Perfil = ({ tipoUsuario }) => {
    const location = useLocation()
    const usuario = location.state || {};
    const { beneficiario, atualizar, editar } = useOutletContext();

    return (
        <>
            <div className={styles.box}>
                <div className={styles.conteudo_principal}>
                    <Link
                        to={"../carregar-imagem"}
                        className={styles.foto}
                        state={{ tipoUser: tipoUsuario, id: usuario.id }}>
                        <div className={styles.botaoImagem}>
                            <BsCamera className={styles.camera}></BsCamera>
                            Alterar foto
                        </div>
                        <img className={styles.perfil} src={usuario.imagemPerfil} alt="Foto do Usuário">
                        </img>
                    </Link>
                    <div className={styles.cont}>
                        <p className={styles.nome} >{usuario.nome}</p>
                        <Botao onClick={() => { editar() }} estilo='editar_perfil'>
                            Editar perfil
                        </Botao>
                    </div>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.info}>
                        <BsEnvelopeAt className={styles.icone} />
                        <p className={styles.textoInfo} >{usuario.email}</p>
                    </div>
                    <div className={styles.info}>
                        <CiCalendar className={styles.icone} />
                        <p className={styles.textoInfo} >{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>
            </div>
            <div className={styles.info_adicional}>
                {/* {
                    tipoUsuario === 'Beneficiario' ?
                        <>
                            <div className={styles.infos_adicionais}>
                                <p className={styles.titulo_adicional}>
                                    Última doação recebida:
                                </p>
                                <div className={styles.textos_adicionais}>
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
                            <img src={usuario.doadores[0].perfil} alt='foto doador' className={styles.imagem_adicional}></img>
                        </>
                        :
                        <>
                        </>
                } */}
            </div>
        </>
    )
}

export default Perfil;