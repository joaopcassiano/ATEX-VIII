import { useEffect, useRef, useState } from 'react'
import styles from './_voluntario.module.css'
import { toast, ToastContainer } from 'react-toastify'
import BeneficiarioService from '../../Services/BeneficiarioService'
import Loader from '../../Componentes/Loader/Loader'
import { BsChevronDoubleRight, BsPerson } from "react-icons/bs";
import Botao from '../../Componentes/Botao/Botao'
import { useLocation } from 'react-router-dom'
import InputMask from 'react-input-mask';
import VoluntarioService from '../../Services/VoluntarioService'
import NecessidadeService from '../../Services/NecessidadeService'
import { BsBroadcast } from "react-icons/bs";

const Voluntariar = () => {
    const [beneficiarios, setBeneficiarios] = useState([])
    const location = useLocation();
    const [id] = useState(location?.state)
    const [loader, setLoader] = useState(false)
    const [blocoVoluntariar, setBlocoVoluntariar] = useState(false)
    const escuroRef = useRef(null);
    const boxVoluntariarRef = useRef(null);
    const [beneficiarioID, setBeneficiarioID] = useState(0);
    const [prioridade, setPrioridade] = useState(null);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        console.log("Estou aqui tambem ")
        setLoader(true)
        toast.dismiss();
        ObterBeneficiarios();
    }, [])

    const fecharBoxVoluntariar = (event) => {
        if (boxVoluntariarRef.current && !boxVoluntariarRef.current.contains(event.target)) {
            setBlocoVoluntariar(false);
            setBeneficiarioID(0)
            setPrioridade('')
            setDescricao('')
        }
    };

    const Voluntariar = async (beneficiarioId) => {
        try {
            const volu = {
                voluntarioID: id, 
                beneficiarioID: beneficiarioId, 
                prioridade: prioridade, 
                descricao: descricao
            }
            const response = await NecessidadeService.Criar(volu); 

            toast.success(`Você se voluntáriou!`, {
                position: "top-center",
                autoClose: 1000
            })
            setBlocoVoluntariar(false)
            setBeneficiarioID(0)
            setPrioridade('')
            setDescricao('')

        } catch (error) {
            console.error(error)
            toast.dismiss();
            toast.error(`${error.response.data}`, {
                position: "top-center",
                autoClose: 2000
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

                    {
                        blocoVoluntariar &&
                        <>
                            <div onClick={fecharBoxVoluntariar} ref={escuroRef} className={styles.escuroTela}>
                                <div ref={boxVoluntariarRef} className={styles.boxEditar}>
                                    <p className={styles.tituloDoacao}>Confirme sua ajuda</p>
                                    <div className={styles.cadaInput}>
                                        <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                        <InputMask
                                            type='text'
                                            placeholder='Descrição da Necessidade'
                                            className={styles.inputCadastro}
                                            value={descricao}
                                            onChange={(event) =>
                                                setDescricao(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={styles.cadaInput}>
                                        <label className={styles.labelCadastro}><BsBroadcast className={styles.iconeCadastro} /></label>
                                        <InputMask
                                            type='text'
                                            placeholder='Prioridades'
                                            className={styles.inputCadastro}
                                            value={prioridade}
                                            onChange={(event) =>
                                                setPrioridade(event.target.value)
                                            }
                                        />
                                    </div>
                                    <Botao estilo='DoarConfirma' onClick={() => Voluntariar(beneficiarioID)}>Confirmar</Botao>
                                </div>
                            </div>
                        </>
                    }

                    <p className={styles.titulo}>Escolha uma pessoa para ajudar</p>
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
                                            <Botao onClick={() => { setBeneficiarioID(beneficiario?.id); setBlocoVoluntariar(true) }} estilo='doar'>Voluntariar-se</Botao>
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

export default Voluntariar