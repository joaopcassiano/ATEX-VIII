import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_beneficiario.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png'
import perfilExemplo from '../../assets/perfilExemplo.png'
import perfilExemploVoluntario from '../../assets/perfilExemploVoluntario.png'
import perfilExemploEmpresa from '../../assets/perfilExemploEmpresa.png'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useState } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferioe/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { ToastContainer, toast } from "react-toastify";
import BeneficiarioService from '../../Services/BeneficiarioService'

const Beneficiario = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const id = location.state || 0;
    const [beneficiario, setBeneficiario] = useState({});

    console.log("id da pessoa " , id)

    useEffect(() => {
        const ObterBeneficiario = async () => {
            try {
                const resposta = await BeneficiarioService.ObterPorId(id)
                console.log("resposta " , resposta)
                setBeneficiario(resposta.data)
                console.log("aqui", beneficiario)

            }
            catch (error) {
                console.log(error)
                const errorMessage = error.response?.data || "Erro desconhecido";
                toast.error(
                    `Erro ao carregar dados do beneficiário: ${errorMessage}`,
                    {
                        position: "top-center",
                        autoClose: 3000,
                    }
                );
            }
        }

        console.log("Id do usuario: " + id)
        toast.success("Login realizado com sucesso!", {
            position: "top-center",
            autoClose: 3000
        });

        ObterBeneficiario()

    }, [])

    const user = {
        nome: 'Anderson Caproni de Oliveira',
        perfil: null,
        email: 'andersoncaproni@gmail.com',
        dataNascimento: '28/09/2004',
        doadores: [
            {
                nome: 'Maria josé da Silva',
                telefone: '(11) 99999-9999',
                dataNascimento: '20/01/1990',
                email: 'maria.jose@gmail.com',
                itemDoado: 'Cesta básica',
                perfil: perfilExemplo,
            }
        ],
        necessidades: [
            {
                nome: 'Joao Victor Pereira',
                telefone: '(10) 90309-2939',
                dataNascimento: '28/01/2000',
                email: 'joao@gmail.com',
                necessidade: 'energia',
                perfil: perfilExemploVoluntario,
            }
        ],
        empregos: [
            {
                nome: 'Ipiranga',
                telefone: '(10) 90309-2939',
                email: 'ipiranga@gmail.com',
                vaga: 'atendente',
                perfil: perfilExemploEmpresa,
            }
        ]
    }

    return (
        <>
            <ToastContainer />
            <div className={styles.corpo}>
                <TopBarLog usuario={beneficiario || user} tipoUsuario='Beneficiario' />
                <CorpoInferior>
                    <SideBar>
                        <Link
                            className={styles.link}
                            to='./consulta-geral'
                            state={user}>
                            <Botao estilo='sideBar'>
                                Consultar histórico geral
                            </Botao>
                        </Link>
                        <Link
                            className={styles.link}
                            to='./consultar-doacoes'
                            state={user}>
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
            </div>
        </>
    )
}

export default Beneficiario;