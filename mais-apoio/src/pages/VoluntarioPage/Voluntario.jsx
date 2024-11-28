import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './styles.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferior/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import VoluntarioService from '../../Services/VoluntarioService';
import EditarVoluntario from '../EditarVoluntario/EditarVoluntario';
import Loader from '../../Componentes/Loader/Loader';

const Voluntario = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const [voluntario, setVoluntario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editar, setEditar] = useState(false);
    const escuroRef = useRef(null);
    const boxEditarRef = useRef(null);
    const [id] = useState(location.state);


    useEffect(() => {
        console.log(location.data)
        toast.dismiss();
        ObterVoluntario()

    }, [atualizar])

    const ObterVoluntario = async () => {
        try {
            const resposta = await VoluntarioService.ObterPorId(id)
            setVoluntario(resposta?.data)
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
            <ToastContainer limit={1} />
            <div className={styles.corpo}>
                {
                    (loading && !voluntario ?
                        <Loader />
                        :
                        <>
                            {
                                editar &&
                                <>
                                    <div onClick={fecharBoxEditar} ref={escuroRef} className={styles.escuroTela}>
                                        <div ref={boxEditarRef} className={styles.boxEditar}>
                                            <EditarVoluntario usuario={voluntario} />
                                        </div>
                                    </div>
                                </>
                            }
                            <TopBarLog usuario={voluntario} tipoUsuario='Voluntario' />
                            <CorpoInferior>
                                <SideBar>
                                    <Link
                                        className={styles.link}
                                        to='./Voluntariar-se'
                                        state={voluntario?.id}>
                                        <Botao estilo='sideBar'>
                                            Voluntariar-se
                                        </Botao>
                                    </Link>
                                    <Link
                                        className={styles.link}
                                        to='./consulta'
                                        state={voluntario?.id}>
                                        <Botao estilo='sideBar'>
                                            Consultar histórico
                                        </Botao>
                                    </Link>
                                </SideBar>
                                <Conteudo>
                                    {location.pathname === '/Voluntario' ?
                                        <>
                                            oi
                                        </>
                                        :
                                        <Outlet context={{ voluntario, atualizar: handleAtualizar, editar: handleEditar}}/>
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

export default Voluntario;