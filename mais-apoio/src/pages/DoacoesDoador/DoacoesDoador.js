import { useEffect, useState } from 'react';
import styles from './_doacoesDoador.module.css'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import DoacaoService from '../../Services/DoacaoService';
import Loader from '../../Componentes/Loader/Loader';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';
import { BsBucket } from 'react-icons/bs';

const DoacoesDoador = () => {
    const location = useLocation();
    const [id] = useState(location.state)
    const [doacoes, setDoacoes] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        console.log(id)
        setLoader(true)
        BuscarDado()
    }, [])

    const BuscarDado = async () => {
        try {
            console.log(id)
            const response = await DoacaoService.ObterDoador(id);
            console.log(response)
            setDoacoes(response.data)
            setLoader(false)

        } catch (error) {
            toast.error(`Erro ao doar: ${error.response.data}`, {
                position: "top-center",
                autoClose: 3000
            })
            setLoader(false)
        }
    }

    return (
        <>
            <ToastContainer limit={1} />
            {loader ?
                <>
                    <Loader />
                </>
                :
                <>

                    <p className={styles.titulo}>Suas doações</p>
                    <div className={styles.container}>
                        {doacoes.map(doacao => (
                            <div className={styles.info_adicional} key={doacao?.DoacaoId}>

                                    <div className={styles.infos_adicionais}>
                                        <div className={styles.textos_adicionais}>
                                            <div className={styles.texto_adicional}>
                                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                <p className={styles.texto_add1} >{doacao?.nome}</p>
                                            </div>
                                            <div className={styles.texto_adicional}>
                                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                                <p className={styles.texto_add} >{doacao?.email}</p>
                                            </div>
                                            <div className={styles.texto_adicional}>
                                                <BsBucket style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                                <p className={styles.texto_add}>{doacao?.descricaoDoacao}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.direita}>
                                        <div className={styles.ativos}>

                                            {
                                                doacao?.ativo ?
                                                    <>
                                                        <div className={styles.bolinhaVerde}></div>
                                                        <p className={styles.ativo}>Ativo</p>
                                                    </>
                                                    :
                                                    <>
                                                        <div className={styles.bolinhaVermelha}></div>
                                                        <p className={styles.ativo}>Inativo</p>
                                                    </>
                                            }


                                        </div>

                                        {
                                            doacao?.imagemPerfil !== null ?

                                                <img alt='foto doador' className={styles.imagem_adicional} src={doacao?.imagemPerfil}></img>
                                                :
                                                <img src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png' alt='foto doador' className={styles.imagem_adicional}></img>
                                        }
                                    </div>
                            </div>
                        ))}
                    </div>

                </>
            }
        </>
    )
}

export default DoacoesDoador;