import { Link, useLocation, useOutletContext } from 'react-router-dom';
import styles from './_perfil.module.css';
import Botao from '../Botao/Botao';
import { CiCalendar } from 'react-icons/ci';
<<<<<<< HEAD
import { BsBucket, BsEnvelopeAt } from 'react-icons/bs';
=======
import { BsArrowReturnRight, BsBucket, BsCamera, BsEnvelopeAt } from 'react-icons/bs';
>>>>>>> 7675bb27774d7e33d6ad1466819047884042f84e
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';

const Perfil = ({ tipoUsuario }) => {
    const location = useLocation()
    const usuario = location.state || {};
    const { beneficiario, atualizar, editar } = useOutletContext();

    return (
        <>
            <div className={styles.box}>
                <div className={styles.conteudo_principal}>
<<<<<<< HEAD
                    <img
                        className={styles.perfil}
                        src={usuario?.perfil || "/path/to/default-image.png"}
                        alt="Foto do Usuário"
                    />
                    <div className={styles.cont}>
                        <p className={styles.nome}>{usuario?.nome || "Nome não disponível"}</p>
                        <Botao estilo="editar_perfil">Editar perfil</Botao>
=======
                    <Link
                        to={"../carregar-imagem"}
                        className={styles.foto}
                        state={{ tipoUser: tipoUsuario, id: usuario.id }}>
                        {usuario.imagemPerfil ?
                            <>
                                <div className={styles.botaoImagem}>
                                    <BsCamera className={styles.camera}></BsCamera>
                                    Alterar foto
                                </div>
                                <img className={styles.perfil} src={usuario.imagemPerfil} alt="Foto do Usuário">
                                </img>
                            </>
                            :
                            <>
                            <div className={styles.botaoImagemPermanente}>
                                    <BsCamera className={styles.cameraPermanente}></BsCamera>
                                    Alterar foto
                                </div>
                            </>
                        }

                    </Link>
                    <div className={styles.cont}>
                        <p className={styles.nome} >{usuario.nome}</p>
                        <Botao onClick={() => { editar()}} estilo='editar_perfil'>
                            Editar perfil
                        </Botao>
>>>>>>> 7675bb27774d7e33d6ad1466819047884042f84e
                    </div>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.info}>
                        <BsEnvelopeAt className={styles.icone} />
<<<<<<< HEAD
                        {usuario?.email || "Email não disponível"}
                    </div>
                    <div className={styles.info}>
                        <CiCalendar className={styles.icone} />
                        {usuario?.dataNascimento || "Data de nascimento não disponível"}
=======
                        <p className={styles.textoInfo} >{usuario.email}</p>
                    </div>
                    <div className={styles.info}>
                        <CiCalendar className={styles.icone} />
                        <p className={styles.textoInfo} >{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR')}</p>
>>>>>>> 7675bb27774d7e33d6ad1466819047884042f84e
                    </div>
                </div>
            </div>
            <div className={styles.info_adicional}>
<<<<<<< HEAD
                {tipoUsuario === "Beneficiario" && usuario?.doadores?.length > 0 ? (
                    <>
                        <div className={styles.infos_adicionais}>
                            <p className={styles.titulo_adicional}>Última doação recebida:</p>
                            <div className={styles.textos_adicionais}>
                                <div className={styles.texto_adicional}>
                                    <FiNavigation2
                                        style={{
                                            transform: "rotate(90deg)",
                                            color: "#007BFF",
                                            fontSize: "1.3rem",
                                        }}
                                    />
                                    <p className={styles.texto_add}>
                                        {usuario.doadores[0]?.nome || "Nome do doador indisponível"}
                                    </p>
                                </div>
                                <div className={styles.texto_adicional}>
                                    <FiAtSign
                                        style={{ color: "#007BFF", fontSize: "1.3rem" }}
                                    />
                                    <p className={styles.texto_add}>
                                        {usuario.doadores[0]?.email || "Email do doador indisponível"}
                                    </p>
                                </div>
                                <div className={styles.texto_adicional}>
                                    <BsBucket
                                        style={{ color: "#007BFF", fontSize: "1.3rem" }}
                                    />
                                    <p className={styles.texto_add}>
                                        {usuario.doadores[0]?.itemDoado || "Item doado não especificado"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <img
                            src={usuario.doadores[0]?.perfil || "/path/to/default-image.png"}
                            alt="Foto do Doador"
                            className={styles.imagem_adicional}
                        />
                    </>
                ) : null}
                {tipoUsuario === "Voluntario" && usuario?.Beneficiario?.length > 0 ? (
                    <>
                        <div className={styles.infos_adicionais}>
                            <p className={styles.titulo_adicional}>Seu Beneficiário ativo:</p>
                            <div className={styles.textos_adicionais}>
                                <div className={styles.texto_adicional}>
                                    <FiNavigation2
                                        style={{
                                            transform: "rotate(90deg)",
                                            color: "#007BFF",
                                            fontSize: "1.3rem",
                                        }}
                                    />
                                    <p className={styles.texto_add}>
                                        {usuario.Beneficiario[0]?.nome || "Nome do beneficiário indisponível"}
                                    </p>
                                </div>
                                <div className={styles.texto_adicional}>
                                    <FiAtSign
                                        style={{ color: "#007BFF", fontSize: "1.3rem" }}
                                    />
                                    <p className={styles.texto_add}>
                                        {usuario.Beneficiario[0]?.email || "Email do beneficiário indisponível"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <img
                            src={usuario.Beneficiario[0]?.perfil || "/path/to/default-image.png"}
                            alt="Foto do Beneficiário"
                            className={styles.imagem_adicional}
                        />
                    </>
                ) : null}
=======
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
>>>>>>> 7675bb27774d7e33d6ad1466819047884042f84e
            </div>
        </>
    );    
}

export default Perfil;