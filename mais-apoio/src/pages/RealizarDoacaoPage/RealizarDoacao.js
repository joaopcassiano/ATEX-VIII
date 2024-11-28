import { useEffect, useRef, useState } from 'react'
import styles from './_realizarDoacao.module.css'
import { toast, ToastContainer } from 'react-toastify'
import BeneficiarioService from '../../Services/BeneficiarioService'
import Loader from '../../Componentes/Loader/Loader'
import { BsChevronDoubleRight, BsPerson } from "react-icons/bs";
import Botao from '../../Componentes/Botao/Botao'
import { useLocation } from 'react-router-dom'
import InputMask from 'react-input-mask';
import DoacaoService from '../../Services/DoacaoService'

const RealizarDoacao = () => {
    const [beneficiarios, setBeneficiarios] = useState([])
    const location = useLocation();
    const [id] = useState(location?.state)
    const [loader, setLoader] = useState(false)
    const [blocoDoar, setBlocoDoar] = useState(false)
    const escuroRef = useRef(null);
    const boxDoarRef = useRef(null);
    const [beneficiarioID, setBeneficiarioID] = useState(0);
    const [quantidade, setQuantidade] = useState(null);
    const [descricaoDoacao, setDescricaoDoacao] = useState('');

    useEffect(() => {
        console.log("Estou aqui tambem ")
        setLoader(true)
        toast.dismiss();
        ObterBeneficiarios();
    }, [])

    const fecharBoxDoar = (event) => {
        if (boxDoarRef.current && !boxDoarRef.current.contains(event.target)) {
            setBlocoDoar(false);
            setBeneficiarioID(0)
            setQuantidade(null)
            setDescricaoDoacao('')
        }
    };

    const Doar = async (beneficiarioId) => {
        try {
            const bene = {
                doadorID: id, 
                beneficiarioID:beneficiarioId, 
                quantidade: quantidade || 0, 
                descricaoDoacao: descricaoDoacao
            }
            const response = await DoacaoService.Criar(bene); 
            toast.success(`Doação feita com sucesso!`, {
                position: "top-center",
                autoClose: 1000
            })
            setBlocoDoar(false)
            setBeneficiarioID(0)
            setQuantidade(null)
            setDescricaoDoacao('')

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
                        blocoDoar &&
                        <>
                            <div onClick={fecharBoxDoar} ref={escuroRef} className={styles.escuroTela}>
                                <div ref={boxDoarRef} className={styles.boxEditar}>
                                    <p className={styles.tituloDoacao}>Confirme sua doação</p>
                                    <div className={styles.cadaInput}>
                                        <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                        <InputMask
                                            type='text'
                                            placeholder='Descrição da doação'
                                            className={styles.inputCadastro}
                                            value={descricaoDoacao}
                                            onChange={(event) =>
                                                setDescricaoDoacao(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={styles.cadaInput}>
                                        <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                        <InputMask
                                            type='text'
                                            placeholder='Quantidades de itens'
                                            className={styles.inputCadastro}
                                            value={quantidade}
                                            onChange={(event) =>
                                                setQuantidade(event.target.value)
                                            }
                                        />
                                    </div>
                                    <Botao estilo='DoarConfirma' onClick={() => Doar(beneficiarioID)}>Confirmar</Botao>
                                </div>
                            </div>
                        </>
                    }

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
                                            <Botao onClick={() => { setBeneficiarioID(beneficiario?.id); setBlocoDoar(true) }} estilo='doar'>Doar</Botao>
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