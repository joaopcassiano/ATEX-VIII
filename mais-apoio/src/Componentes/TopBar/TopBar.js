import Botao from '../Botao/Botao';
import styles from './_topBar.module.css'
import logo from '../../assets/logo.png';

const TopBar = ({ valor, valorLogin}) => {
    return (<>
        <div className={styles.topBar}>
            <Botao estilo='logoHome' onClick={() => { valor(1)}}><img src={logo} alt="Logo" className={styles.logoImagem} /></Botao>
            <div className={styles.funcionalidades}>
                <Botao estilo='funcionalidadeHome' onClick={() => { valor(2)}}>Quem Somos</Botao>
                <Botao estilo='funcionalidadeHome' onClick={() => { valor(3)}}>Quero Ajudar</Botao>
                <Botao estilo='funcionalidadeHome' onClick={() => { valor(4)}}>Preciso de Ajuda</Botao>
            </div>
            <div className={styles.botoesDirecionamento}>
                <Botao estilo='entrarHome' onClick={() => { valorLogin(true)}}>Entrar</Botao>
                <Botao estilo='cadastrarHome' onClick={() => { valor(6)}}>Cadastre-se</Botao>
            </div>
        </div>
    </>)
}

export default TopBar;