import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_empresa.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png';
import perfilExemploEmpresa from '../../assets/perfilExemploEmpresa.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useRef, useState } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferior/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { ToastContainer, toast } from "react-toastify";
import EmpresaService from '../../Services/EmpresaService';
import Loader from '../../Componentes/Loader/Loader';
import EditarEmpresa from '../EditarEmpresa/EditarEmpresa';

const Empresa = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const [id] = useState(2);
    const [empresa, setEmpresa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editar, setEditar] = useState(false);
    const escuroRef = useRef(null);
    const boxEditarRef = useRef(null);

    useEffect(() => {
        ObterEmpresa()
    }, [atualizar])

    const ObterEmpresa = async () => {
        try {
            const resposta = await EmpresaService.ObterPorId(id)
            setEmpresa(resposta?.data)
            setLoading(false)
            toast.success("Informações carregadas com sucesso!", {
                position: "top-center",
                autoClose: 3000
            });
        }
        catch (error) {
            const errorMessage = error.response?.data || "Erro desconhecido";
            toast.error(
                `Erro ao carregar dados da empresa: ${errorMessage}`,
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
                    (loading && !empresa ?
                        <Loader />
                        :
                        <>
                            {
                                editar &&
                                <>
                                    <div onClick={fecharBoxEditar} ref={escuroRef} className={styles.escuroTela}>
                                        <div ref={boxEditarRef} className={styles.boxEditar}>
                                            <EditarEmpresa usuario={empresa} />
                                        </div>
                                    </div>
                                </>
                            }

                            <TopBarLog usuario={empresa} tipoUsuario='Empresa' />
                            <CorpoInferior>
                                <SideBar>
                                    <Link
                                        className={styles.link}
                                        to='./empregar'
                                        state={empresa?.id}>
                                        <Botao estilo='sideBar'>
                                            Consultar histórico geral
                                        </Botao>
                                    </Link>
                                    <Link
                                        className={styles.link}
                                        to='./consultar-vagas'
                                        state={empresa?.id}>
                                        <Botao estilo='sideBar'>
                                            Consultar vagas disponíveis
                                        </Botao>
                                    </Link>
                                </SideBar>
                                <Conteudo>
                                    {location.pathname === '/empresa' ? 
                                        <p>Bem-vindo à área da empresa! Aqui você pode gerenciar as vagas e consultar o histórico.</p>
                                     : 
                                        <Outlet  context={{ empresa, atualizar: handleAtualizar, editar: handleEditar}}/>
                                    }
                                </Conteudo>
                            </CorpoInferior>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Empresa;
