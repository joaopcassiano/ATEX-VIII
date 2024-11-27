import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './styles.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png';
import perfilExemplo from '../../assets/perfilExemplo.png';
import perfilExemplo2 from '../../assets/FotoVoluntario2.png';
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
        Beneficiario: [
            {
                nome: 'Maria josé da Silva',
                telefone: '(11) 99999-9999',
                dataNascimento: '20/01/1990',
                email: 'maria.jose@gmail.com',
                perfil: perfilExemplo2,
            },
            {
                nome: 'josé dos Santos Perreira',
                telefone: '(22) 11111-1111',
                dataNascimento: '11/06/1985',
                email: 'jose.d.s.perreira@gmail.com',
                perfil: perfilExemplo,
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