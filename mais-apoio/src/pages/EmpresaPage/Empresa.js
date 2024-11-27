import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_empresa.module.css'; 
import fotoPerfil from '../../assets/fotoPerfil.png';
import perfilExemploEmpresa from '../../assets/perfilExemploEmpresa.png'; 
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useState } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferior/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';
import { ToastContainer, toast } from "react-toastify";
import EmpresaService from '../../Services/EmpresaService'; 

const Empresa = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [atualizar, setAtualizar] = useState(false);
    const id = location.state || 0; // O ID da empresa vem do estado passado via navegação
    const [empresa, setEmpresa] = useState({});

    console.log("id da empresa " , id);

    useEffect(() => {
        const ObterEmpresa = async () => {
            try {
                const resposta = await EmpresaService.ObterPorId(id);
                console.log("resposta " , resposta);
                setEmpresa(resposta.data);
                console.log("empresa", empresa);
            } catch (error) {
                console.log(error);
                const errorMessage = error.response?.data || "Erro desconhecido";
                toast.error(
                    `Erro ao carregar dados da empresa: ${errorMessage}`,
                    {
                        position: "top-center",
                        autoClose: 3000,
                    }
                );
            }
        };

        console.log("Id da empresa: " + id);
        toast.success("Login realizado com sucesso!", {
            position: "top-center",
            autoClose: 3000
        });

        ObterEmpresa();

    }, [id, empresa]); // Adicione empresa na lista de dependências se precisar atualizar com os dados da empresa

    const user = {
        nome: 'TechCorp Ltda.',
        perfil: null,
        email: 'contato@techcorp.com',
        dataNascimento: '10/05/2000',
        empregados: [
            {
                nome: 'Carlos Silva',
                telefone: '(11) 12345-6789',
                dataNascimento: '15/03/1985',
                email: 'carlos.silva@techcorp.com',
                cargo: 'Desenvolvedor',
                perfil: perfilExemploEmpresa,
            }
        ],
        vagas: [
            {
                cargo: 'Analista de TI',
                localizacao: 'São Paulo',
                requisitos: 'Experiência em segurança da informação',
                perfil: perfilExemploEmpresa,
            }
        ]
    };

    return (
        <>
            <ToastContainer />
            <div className={styles.corpo}>
                <TopBarLog usuario={empresa || user} tipoUsuario='Empresa' />
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
                            to='./consultar-vagas'
                            state={user}>
                            <Botao estilo='sideBar'>
                                Consultar vagas disponíveis
                            </Botao>
                        </Link>
                    </SideBar>
                    <Conteudo>
                        {location.pathname === '/empresa' ? (
                            <p>Bem-vindo à área da empresa! Aqui você pode gerenciar as vagas e consultar o histórico.</p>
                        ) : (
                            <Outlet />
                        )}
                    </Conteudo>
                </CorpoInferior>
            </div>
        </>
    );
};

export default Empresa;
