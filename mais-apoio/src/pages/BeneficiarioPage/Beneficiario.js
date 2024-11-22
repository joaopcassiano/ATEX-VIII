import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_beneficiario.module.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useState } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferioe/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { ToastContainer, toast } from "react-toastify";
import BeneficiarioService from '../../Services/BeneficiarioService'
import Loader from '../../Componentes/Loader/Loader';

const Beneficiario = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const [id] = useState(location.state);
    const [beneficiario, setBeneficiario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const ObterBeneficiario = async () => {
            try {
                const resposta = await BeneficiarioService.ObterPorId(id)
                setBeneficiario(resposta?.data)
                setLoading(false)
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

        ObterBeneficiario()

    }, [])

    return (
        <>
            <ToastContainer />
            <div className={styles.corpo}>
                {
                    (loading && !beneficiario ?
                        <Loader />
                        :
                        <>
                            <TopBarLog usuario={beneficiario} tipoUsuario='Beneficiario' />
                            <CorpoInferior>
                                <SideBar>
                                    <Link
                                        className={styles.link}
                                        to='./consulta-geral'
                                        state={beneficiario}>
                                        <Botao estilo='sideBar'>
                                            Consultar histórico geral
                                        </Botao>
                                    </Link>
                                    <Link
                                        className={styles.link}
                                        to='./consultar-doacoes'
                                        state={beneficiario}>
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
                                        <Outlet />
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