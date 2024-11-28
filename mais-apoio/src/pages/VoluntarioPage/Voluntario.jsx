import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './styles.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferior/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';

const Voluntario = () => {
    const location = useLocation();

    const user = {
        nome: 'Pedro Henrique',
        perfil: fotoPerfil,
        email: 'pedrohenriquespadilha@gmail.com',
        dataNascimento: '11/06/2005',
        Beneficiario: [
            {
                nome: 'Maria josé da Silva',
                telefone: '(11) 99999-9999',
                dataNascimento: '20/01/1990',
                email: 'maria.jose@gmail.com',
                perfil: 'https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png',
            },
            {
                nome: 'josé dos Santos Perreira',
                telefone: '(22) 11111-1111',
                dataNascimento: '11/06/1985',
                email: 'jose.d.s.perreira@gmail.com',
                perfil: 'https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png',
            }
        ],
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
                        to='./consulta'
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