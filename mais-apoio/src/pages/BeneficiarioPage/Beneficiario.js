import TopBarLog from '../../Componentes/TopBarLog/TopBarLog';
import styles from './_beneficiario.module.css';
import fotoPerfil from '../../assets/fotoPerfil.png'
import perfilExemplo from '../../assets/perfilExemplo.png'
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../Componentes/SideBar/SideBar';
import { useEffect, useRef } from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import CorpoInferior from '../../Componentes/CorpoInferioe/CorpoInferior';
import Botao from '../../Componentes/Botao/Botao';

const Beneficiario = () => {
    const user = {
        nome: 'Anderson Caproni de Oliveira',
        perfil: fotoPerfil,
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
        ]
    }

    return (
        <div className={styles.corpo}>
            <TopBarLog usuario={user} tipoUsuario='Beneficiario' />
            <CorpoInferior>
                <SideBar>
                    <Link
                        className={styles.link}
                        to=''
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
                    <Outlet />
                </Conteudo>
            </CorpoInferior>
        </div>
    )
}

export default Beneficiario;