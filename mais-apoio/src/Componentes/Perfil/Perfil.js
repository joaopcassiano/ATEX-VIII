import { useLocation } from 'react-router-dom';
import styles from './_perfil.module.css';
import Botao from '../Botao/Botao';
import { CiCalendar } from 'react-icons/ci';
import { BsBucket, BsEnvelopeAt } from 'react-icons/bs';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';

const Perfil = ({ tipoUsuario }) => {
    const location = useLocation()
    const usuario = location.state || {};

    return (
        <>
            <div className={styles.box}>
                <div className={styles.conteudo_principal}>
                    <img
                        className={styles.perfil}
                        src={usuario?.perfil || "/path/to/default-image.png"}
                        alt="Foto do Usuário"
                    />
                    <div className={styles.cont}>
                        <p className={styles.nome}>{usuario?.nome || "Nome não disponível"}</p>
                        <Botao estilo="editar_perfil">Editar perfil</Botao>
                    </div>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.info}>
                        <BsEnvelopeAt className={styles.icone} />
                        {usuario?.email || "Email não disponível"}
                    </div>
                    <div className={styles.info}>
                        <CiCalendar className={styles.icone} />
                        {usuario?.dataNascimento || "Data de nascimento não disponível"}
                    </div>
                </div>
            </div>
            <div className={styles.info_adicional}>
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
            </div>
        </>
    );    
}

export default Perfil;