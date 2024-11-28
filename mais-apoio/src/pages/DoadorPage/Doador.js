import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_doador.module.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useRef, useState } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferior/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { ToastContainer, toast } from "react-toastify";
import DoadorService from '../../Services/DoadorService'
import Loader from '../../Componentes/Loader/Loader';
import EditarDoador from '../EditarDoador/EditarDoador';

const Doador = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const [doador, setDoador] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editar, setEditar] = useState(false);
    const escuroRef = useRef(null);
    const boxEditarRef = useRef(null);
    const [id] = useState(location.state);


    useEffect(() => {
        console.log(location.data)
        toast.dismiss();
        ObterDoador()
        
    }, [atualizar])

    const ObterDoador = async () => {
        try {
            const resposta = await DoadorService.ObterPorId(id)
            setDoador(resposta?.data)
            setLoading(false)
            
        }
        catch (error) {
            const errorMessage = error.response?.data || "Erro desconhecido";
            toast.dismiss();
            toast.error(
                `Erro ao carregar dados do voluntario: ${errorMessage}`,
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
            <ToastContainer limit={1}/>
            <div className={styles.corpo}>
                {
                    (loading && !doador ?
                        <Loader />
                        :
                        <>
                            {
                                editar &&
                                <>
                                    <div onClick={fecharBoxEditar} ref={escuroRef} className={styles.escuroTela}>
                                        <div ref={boxEditarRef} className={styles.boxEditar}>
                                            <EditarDoador usuario={doador}/>
                                        </div>
                                    </div>
                                </>
                            }

                            <TopBarLog usuario={doador} tipoUsuario='Doador' />
                            <CorpoInferior>
                                <SideBar>
                                    <Link
                                        className={styles.link}
                                        state={doador?.id}
                                        to='./realizar-doacao'>
                                        <Botao estilo='sideBar'>
                                            Realizar Doação
                                        </Botao>
                                    </Link>
                                    <Link
                                        className={styles.link}
                                        state={doador?.id}
                                        to='./doacoes'>
                                        <Botao estilo='sideBar'>
                                            Consultar histórico
                                        </Botao>
                                    </Link>
                                </SideBar>
                                <Conteudo>
                                    {location.pathname === '/doador' ?
                                        <>
                                            oi
                                        </>
                                        :
                                        <Outlet context={{ doador, atualizar: handleAtualizar, editar: handleEditar}} />
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

export default Doador;