import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_beneficiario.module.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useRef, useState } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferior/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { ToastContainer, toast } from "react-toastify";
import BeneficiarioService from '../../Services/BeneficiarioService'
import Loader from '../../Componentes/Loader/Loader';
import EditarBeneficiario from '../EditarBeneficiario/EditarBeneficiario';

const Beneficiario = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const [id] = useState(location.state);
    const [beneficiario, setBeneficiario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editar, setEditar] = useState(false);
    const escuroRef = useRef(null);
    const boxEditarRef = useRef(null);

    useEffect(() => {
        ObterBeneficiario()
    }, [atualizar])

    const ObterBeneficiario = async () => {
        try {
            const resposta = await BeneficiarioService.ObterPorId(id)
            setBeneficiario(resposta?.data)
            setLoading(false)
            toast.success("Informações carregadas com sucesso!", {
                position: "top-center",
                autoClose: 3000
            });
        }
        catch (error) {
            const errorMessage = error.response?.data || "Erro desconhecido";
            toast.error(
                `Erro ao carregar dados do beneficiário: ${errorMessage}`,
                {
                    position: "top-center",
                    autoClose: 3000,
                }
            );
            setLoading(false);
            navigate('../home/apresentacao');
        }
    }

    const fecharBoxEditar = (event) => {
        if (boxEditarRef.current && !boxEditarRef.current.contains(event.target)) {
            setEditar(false);
        }
    };

    const handleAtualizar = () => {
        setAtualizar(prev => !prev);
    };


    const handleEditar = () => {
        setEditar(true);
        console.log("Mudou")
    };

    return (
        <>
            <ToastContainer />
            <div className={styles.corpo}>
                {
                    (loading && !beneficiario ?
                        <Loader />
                        :
                        <>
                            {
                                editar &&
                                <>
                                    <div onClick={fecharBoxEditar} ref={escuroRef} className={styles.escuroTela}>
                                        <div ref={boxEditarRef} className={styles.boxEditar}>
                                            <EditarBeneficiario usuario={beneficiario}/>
                                        </div>
                                    </div>
                                </>
                            }

                            <TopBarLog usuario={beneficiario} tipoUsuario='Beneficiario' />
                            <CorpoInferior>
                                <SideBar>
                                    <Link
                                        className={styles.link}
                                        to='./consulta-geral'>
                                        <Botao estilo='sideBar'>
                                            Consultar histórico geral
                                        </Botao>
                                    </Link>
                                    <Link
                                        className={styles.link}
                                        to='./consultar-doacoes'>
                                        <Botao estilo='sideBar'>
                                            Consultar histórico de doações
                                        </Botao>
                                    </Link>
                                </SideBar>
                                <Conteudo>
                                    {location.pathname === '/beneficiario' ?
                                        <>
                                            oi
                                        </>
                                        :
                                        <Outlet context={{ beneficiario, atualizar: handleAtualizar, editar: handleEditar}} />
                                    }
                                </Conteudo>
                            </CorpoInferior>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Beneficiario;