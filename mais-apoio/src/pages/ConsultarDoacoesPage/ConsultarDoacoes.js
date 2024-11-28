import { useOutletContext } from 'react-router-dom';
import Botao from '../../Componentes/Botao/Botao';
import styles from './_consultarDoacoes.module.css';
import InputMask from 'react-input-mask';
import DoacaoService from '../../Services/DoacaoService'
import { useEffect, useState } from 'react';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';
import { BsBucket, BsCalendar } from 'react-icons/bs';

const ConsultarDoacoes = () => {
    const { beneficiario, atualizar, editar } = useOutletContext();
    const [doacoes, setDoacoes] = useState([]);

    useEffect(() => {
        ObterDoacao();
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

    return (
        <div className={styles.conteudo}>
            <div className={styles.titulo_maior}>
                Histórico de doações
            </div>
            {/* <div className={styles.cabeca}>
                <div className={styles.linha}>
                    <InputMask
                        type='text'
                        placeholder='Nome doador'
                        className={styles.inputPesquisa} />
                    <InputMask
                        type='date'
                        placeholder='Data da doação'
                        className={styles.inputPesquisa} />
                </div>
                <div className={styles.linha}>
                    <InputMask
                        type='text'
                        placeholder='Item da doacao'
                        className={styles.inputPesquisa} />
                    <Botao estilo='pesquisar' >Pesquisar</Botao>
                </div>
            </div> */}
            <div className={styles.corpo}>
                    {doacoes.map(doacao => (
                        <div className={styles.info_adicional} key={doacao?.DoacaoId}>
                            <div className={styles.infos_adicionais}>
                                <div className={styles.textos_adicionais}>
                                    <div className={styles.texto_adicional}>
                                        <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >{doacao?.nome}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add} >{doacao?.email}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add}>{doacao?.descricaoDoacao}</p>
                                    </div>
                                    <div className={styles.texto_adicional}>
                                        <BsCalendar style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                        <p className={styles.texto_add}>{new Date(doacao?.dataDoacao).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                doacao?.imagemPerfil === null ?
                                    <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem_adicional}></img>
                                    :
                                    <img src={doacao?.imagemPerfil} alt='foto doador' className={styles.imagem_adicional}></img>
                            }
                        </div>
                    ))}
            </div>

        </div >
    )
}

export default ConsultarDoacoes;