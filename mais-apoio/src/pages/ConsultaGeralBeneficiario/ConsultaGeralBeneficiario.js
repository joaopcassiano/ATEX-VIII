import { useLocation, useOutletContext } from 'react-router-dom';
import styles from './_consultaGeralBeneficiario.module.css';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';
import { BsBucket } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import DoacaoService from '../../Services/DoacaoService';
import VoluntarioService from '../../Services/VoluntarioService';
import EmpregoService from '../../Services/EmpregoService';
import NecessidadeService from '../../Services/NecessidadeService';
import { BsClipboard2Fill } from "react-icons/bs";

const ConsultaGeralBeneficiario = () => {

    const location = useLocation();
    const [maior, setMaior] = useState(false);
    const usuario = location.state || {};
    const [doacoes, setDoacoes] = useState([]);
    const [emprego, setEmprego] = useState([]);
    const [necessidade, setNecessidade] = useState([]);
    const { beneficiario, atualizar, editar } = useOutletContext();

    useEffect(() => {
        ObterDoacao();
        ObterNecessidade();
        obterEmprego();
    }, [])

    const ObterDoacao = async () => {
        try {
            const resposta = await DoacaoService.ObterBeneficiario(beneficiario?.id)
            console.log(resposta)
            setDoacoes(resposta.data)
        } catch (error) {
            console.error('Erro ao buscar doações:', error);
        }
    }

    const ObterNecessidade = async () => {
        try {
            const resposta = await NecessidadeService.ObterBeneficiario(beneficiario?.id)
            console.log("Estamos aqui: ",resposta)
            setNecessidade(resposta.data)
        } catch (error) {
            console.error('Erro ao buscar as ajudas:', error);
        }
    }

    const obterEmprego = async () => {
        try {
            const resposta = await EmpregoService.ObterBeneficiario(beneficiario?.id)
            console.log(resposta)
            setEmprego(resposta.data)
        } catch (error) {
            console.error('Erro ao buscar os empregos:', error);
        }
    }


    return (
        <>
            <div className={styles.corpo}>
                <div className={styles.titulo_maior}>
                    Histórico geral
                </div>
                {
                    doacoes.length === 0 ?
                        <div className={styles.box}>
                            <div className={styles.item}>
                                <div className={styles.titulo}>
                                    Sua última doação recebida:
                                </div>
                                <div className={styles.conteudo}>
                                    <p className={styles.casoNao}>
                                        Você ainda não recebeu nenhuma doação
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.box}>
                            <div className={styles.item}>
                                <div className={styles.titulo}>
                                    Sua última doação recebida:
                                </div>
                                <div className={styles.conteudo}>
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
                            {doacoes[doacoes.length - 1]?.imagemPerfil === null ?
                                <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem}></img>

                                :
                                <img src={doacoes[doacoes.length - 1]?.imagemPerfil} alt='foto doador' className={styles.imagem}></img>

                            }
                        </div>
                }

                {
                    necessidade.length === 0 ?
                        <div className={styles.box}>
                            <div className={styles.item}>
                                <div className={styles.titulo}>
                                    Sua última ajuda recebida:
                                </div>
                                <div className={styles.conteudo}>
                                    <p className={styles.casoNao}>
                                        Você ainda não recebeu nenhuma ajuda
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.box}>
                            <div className={styles.item}>
                                <div className={styles.titulo}>
                                Sua última ajuda recebida:
                                </div>
                                <div className={styles.conteudo}>
                                    <div className={styles.texto_adicional}>
                                        <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >{necessidade[necessidade.length - 1]?.nome}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >{necessidade[necessidade.length - 1]?.email}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add}>{necessidade[necessidade.length - 1]?.descricao}</p>
                                    </div>
                                </div>
                            </div>
                            {necessidade[necessidade.length - 1]?.imagemPerfil === null ?
                                <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem}></img>

                                :
                                <img src={necessidade[necessidade.length - 1]?.imagemPerfil} alt='foto doador' className={styles.imagem}></img>

                            }
                        </div>
                }

                {
                    emprego.length === 0 ?
                        <div className={styles.box}>
                            <div className={styles.item}>
                                <div className={styles.titulo}>
                                    Seu emprego atual:
                                </div>
                                <div className={styles.conteudo}>
                                    <p className={styles.casoNao}>
                                        Você ainda não está empregado
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.box}>
                            <div className={styles.item}>
                                <div className={styles.titulo}>
                                Seu emprego atual:
                                </div>
                                <div className={styles.conteudo}>
                                    <div className={styles.texto_adicional}>
                                        <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >{emprego[emprego.length - 1]?.nome}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >{emprego[emprego.length - 1]?.email}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <BsClipboard2Fill style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add}>{emprego[emprego.length - 1]?.tipoEmprego}</p>
                                    </div>
                                </div>
                            </div>
                            {emprego[emprego.length - 1]?.imagemPerfil === null ?
                                <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem}></img>

                                :
                                <img src={emprego[emprego.length - 1]?.imagemPerfil} alt='foto doador' className={styles.imagem}></img>

                            }
                        </div>
                }
            </div>
        </>
    )
}

export default ConsultaGeralBeneficiario;