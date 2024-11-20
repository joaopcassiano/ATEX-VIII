import Botao from '../Botao/Botao';
import styles from './_topBar.module.css'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const TopBar = ({ valorLogin }) => {
    return (<>
        <div className={styles.topBar}>
            <Link className={styles.link} to='/home/apresentacao'>
                <Botao estilo='logoHome'>
                    <img src={logo} alt="Logo" className={styles.logoImagem} />
                </Botao>
            </Link>
            <div className={styles.funcionalidades}>
                <Link className={styles.link} to='/home/quem-somos'>
                    <Botao estilo='funcionalidadeHome' >Quem Somos</Botao>
                </Link>
                <Link className={styles.link} to='/home/quero-ajudar'>
                    <Botao estilo='funcionalidadeHome' >Quero Ajudar</Botao>
                </Link>
                <Link className={styles.link} to='/home/preciso-de-ajuda'>
                    <Botao estilo='funcionalidadeHome' >Preciso de Ajuda</Botao>
                </Link>
            </div>
            <div className={styles.botoesDirecionamento}>
                <Botao estilo='entrarHome' onClick={() => { valorLogin(true) }}>Entrar</Botao>
                <Link className={styles.link} to='/home/todos-cadastros'>
                    <Botao estilo='cadastrarHome' >Cadastre-se</Botao>
                </Link>
            </div>
        </div>
    </>)
}

export default TopBar;