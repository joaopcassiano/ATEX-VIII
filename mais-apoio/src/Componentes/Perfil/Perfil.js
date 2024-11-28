import { Link, useLocation, useOutletContext } from 'react-router-dom';
import styles from './_perfil.module.css';
import Botao from '../Botao/Botao';
import { CiCalendar } from 'react-icons/ci';
import { BsArrowReturnRight, BsBucket, BsCamera, BsEnvelopeAt } from 'react-icons/bs';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import DoacaoService from '../../Services/DoacaoService';
import { toast, ToastContainer } from 'react-toastify';

const Perfil = ({ tipoUsuario }) => {
    const location = useLocation()
    const usuario = location.state || {};
    const { beneficiario, atualizar, editar } = useOutletContext();
    const [doacoes, setDoacoes] = useState([])

    useEffect(() => {
        if (tipoUsuario === 'Doador') {
            BuscarDado()
        }
    }, [])

    const BuscarDado = async () => {
        try {
            const response = await DoacaoService.ObterDoador(usuario?.id);
            setDoacoes(response.data)

        } catch (error) {
            toast.error(`Erro ao buscar doador: ${error.response.data}`, {
                position: "top-center",
                autoClose: 3000
            })
        }
    }

    return (
        <>
            <ToastContainer />
            <div className={styles.box}>
                <div className={styles.conteudo_principal}>
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
                    {
                        tipoUsuario !== 'Empresa' &&
                        <div className={styles.info}>
                            <CiCalendar className={styles.icone} />
                            <p className={styles.textoInfo} >{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR')}</p>
                        </div>
                    }

                </div>
            </div>
            <div className={styles.info_adicional}>
                {
                    tipoUsuario === 'Beneficiario' ?
                        <>
                            <div className={styles.infos_adicionais}>
                                <p className={styles.titulo_adicional}>
                                    Última doação recebida:
                                </p>
                                <div className={styles.textos_adicionais}>
                                    <div className={styles.texto_adicional}>
                                        <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >Nome completo</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >emaildapessoa@gmail.com</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add}>item doado</p>
                                    </div>
                                </div>
                            </div>
                            <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem_adicional}></img>
                        </>
                        :
                        tipoUsuario === 'Doador' ?
                            <>
                                {
                                    doacoes.length === 0 ?
                                        <div className={styles.infos_adicionais}>
                                            <p className={styles.titulo_adicional}>
                                                Última doação feita:
                                            </p>
                                            <div className={styles.textos_adicionaisSem}>
                                                Você ainda não realizou nenhuma doação
                                            </div>
                                        </div>
                                        :
                                        <>
                                            <div className={styles.infos_adicionais}>
                                                <p className={styles.titulo_adicional}>
                                                    Última doação feita:
                                                </p>
                                                <div className={styles.textos_adicionais}>
                                                    <div className={styles.texto_adicional}>
                                                        <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        <p className={styles.texto_add} >{doacoes[doacoes.length - 1]?.nome}</p>
                                                    </div>
                                                    <div className={styles.texto_adicional}>
                                                        <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                                        <p className={styles.texto_add} >{doacoes[doacoes.length - 1]?.email}</p>
                                                    </div>
                                                    <div className={styles.texto_adicional}>
                                                        <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                                        <p className={styles.texto_add}>{doacoes[doacoes.length - 1]?.descricaoDoacao}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                doacoes[doacoes.length - 1]?.imagemPerfil === null ?
                                                    <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem_adicional}></img>
                                                    :
                                                    <img src={doacoes[doacoes.length - 1]?.imagemPerfil} alt='foto doador' className={styles.imagem_adicional}></img>
                                            }
                                        </>
                                }
                            </>
                            :
                            <>
                            </>
                }
            </div>
        </>
    )
}

export default Perfil;