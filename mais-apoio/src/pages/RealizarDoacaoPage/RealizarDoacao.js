import { useEffect, useState } from 'react'
import styles from './_realizarDoacao.module.css'
import { toast, ToastContainer } from 'react-toastify'
import BeneficiarioService from '../../Services/BeneficiarioService'
import Loader from '../../Componentes/Loader/Loader'
import { BsChevronDoubleRight } from "react-icons/bs";

const RealizarDoacao = () => {
    const [beneficiarios, setBeneficiarios] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        console.log("Estou aqui tambem ")
        setLoader(true)
        ObterBeneficiarios();
    }, [])

    const ObterBeneficiarios = async () => {
        try {
            const resposta = await BeneficiarioService.ObterTodos()
            console.log(resposta)
            setBeneficiarios(resposta?.data)
            toast.success("Beneficiários buscados com sucesso!", {
                position: "top-center",
                autoClose: 3000
            });
            setLoader(false)

        }
        catch (error) {
            console.error(error)
            toast.error(`Erro ao carregar os dados: ${error.response.data}`, {
                position: "top-center",
                autoClose: 3000
            })
            setLoader(false)
        }
    }

    return (
        <>
            <ToastContainer />
            {loader ?
                <>
                    <Loader />
                </>
                :
                <>

                    <p className={styles.titulo}>Escolha uma pessoa para doar</p>
                    <div className={styles.container}>


                        {beneficiarios.map(beneficiario => (
                            <div key={beneficiario.id}>
                                <div className={styles.box}>
                                    <img className={styles.imagem} src={beneficiario?.imagemPerfil}></img>
                                    <div className={styles.infos}>
                                        <p className={styles.nome}>{beneficiario?.nome}</p>
                                        <p className={styles.demais}><BsChevronDoubleRight className={styles.icone} />{beneficiario?.situacaoEconomica}</p>
                                        <p className={styles.demais}><BsChevronDoubleRight className={styles.icone} />{beneficiario?.necessidade}</p>
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