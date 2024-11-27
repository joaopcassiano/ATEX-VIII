import { useEffect, useState } from 'react'
import styles from './_realizarDoacao.module.css'
import { toast, ToastContainer } from 'react-toastify'
import BeneficiarioService from '../../Services/BeneficiarioService'
import Loader from '../../Componentes/Loader/Loader'
import { BsChevronDoubleRight } from "react-icons/bs";
import Botao from '../../Componentes/Botao/Botao'
import { useLocation } from 'react-router-dom'

const RealizarDoacao = () => {
    const [beneficiarios, setBeneficiarios] = useState([])
    const location = useLocation();
    const [id] = useState(location?.state)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        console.log("Estou aqui tambem ")
        setLoader(true)
        toast.dismiss();
        ObterBeneficiarios();
    }, [])

    const Doar = (beneficiarioId) => {
        try{
            console.log(beneficiarioId)
            console.log(id)

        }catch(erro){
            console.error(erro)
            toast.dismiss();
            toast.error(`Erro ao doar: ${erro.response.data}`, {
                position: "top-center",
                autoClose: 3000
            })
        }
    }

    const ObterBeneficiarios = async () => {
        try {
            const resposta = await BeneficiarioService.ObterTodos()
            console.log(resposta)
            setBeneficiarios(resposta?.data)
            setLoader(false)

        }
        catch (error) {
            console.error(error)
            toast.dismiss();
            toast.error(`Erro ao carregar os beneficiários: ${error.response.data}`, {
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

                    <p className={styles.titulo}>Escolha uma pessoa para doar</p>
                    <div className={styles.container}>


                        {beneficiarios.map(beneficiario => (
                            <div key={beneficiario?.id}>
                                <div className={styles.box}>
                                    {
                                        beneficiario?.imagemPerfil !== null ?
                                            <img className={styles.imagem} alt='imagemBeneficiario' src={beneficiario?.imagemPerfil}></img>
                                            :
                                            <img className={styles.imagem} alt='imagemPagrao' src='https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png'></img>
                                    }
                                    <div className={styles.infos}>
                                        <p className={styles.nome}>{beneficiario?.nome}</p>
                                        <p className={styles.demais}><BsChevronDoubleRight className={styles.icone} />{beneficiario?.situacaoEconomica}</p>
                                        <p className={styles.demais}><BsChevronDoubleRight className={styles.icone} />{beneficiario?.necessidade}</p>
                                        <div className={styles.botao}>
                                            <Botao onClick={() => Doar(beneficiario?.id)} estilo='doar'>Doar</Botao>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>

                </>
            }

        </>
    )
}

export default RealizarDoacao