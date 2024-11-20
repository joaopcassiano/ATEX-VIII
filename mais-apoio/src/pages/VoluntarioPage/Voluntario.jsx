import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './styles';
import fotoPerfil from '../../assets/fotoPerfil.png'
import perfilExemplo from '../../assets/perfilExemplo.png'
import perfilExemploVoluntario from '../../assets/perfilExemploVoluntario.png'
import perfilExemploEmpresa from '../../assets/perfilExemploEmpresa.png'
import { Link, Outlet, useLocation } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferioe/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';

const Voluntario = () => {
    const location = useLocation();

    const user = {
        nome: 'Pedro Henrique',
        perfil: fotoPerfil,
        email: 'pedrohenriquespadilha@gmail.com',
        dataNascimento: '11/06/2005',
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
        <div className={styles.corpo}>
            <TopBarLog usuario={user} tipoUsuario='Voluntario' />
            <CorpoInferior>
                <SideBar>
                    <Link
                        className={styles.link}
                        to='./Voluntariar-se'
                        state={user}>
                        <Botao estilo='sideBar'>
                            Voluntariar-se
                        </Botao>
                    </Link>
                    <Link
                        className={styles.link}
                        to='./consultar-historico'
                        state={user}>
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
                        <Outlet />
                    }
                </Conteudo>
            </CorpoInferior>
        </div>
    )
}

export default Voluntario;