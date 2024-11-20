import styles from './_conteudoTodosCadastros.module.css';
import empresaCadastro from '../../assets/empresaCadastro.png';
import doadorCadastro from '../../assets/doadorCadastro.png';
import voluntarioCadastro from '../../assets/voluntarioCadastro.png';
import beneficiarioCadastro from '../../assets/beneficiarioCadastro.png';
import Botao from '../../Componentes/Botao/Botao';
import { Link } from 'react-router-dom';

const ConteudoTodosCadastros = () => {
    return (
        <>
            <div className={styles.conteudoCadastro}>
                <div className={styles.tituloCadastro}>
                    Selecione a opção para cadastrar
                </div>
                <div className={styles.boxsCadastro}>
                    <Link to='../cadastro-beneficiario' className={styles.link}>
                        <Botao estilo='imagemCadastro'>
                            <img src={beneficiarioCadastro} alt='beneficiarioCadastro' className={styles.imagemCadastro}></img>
                        </Botao>
                    </Link>
                    <Link to='../cadastro-voluntario' className={styles.link}>
                        <Botao estilo='imagemCadastro'>
                            <img src={voluntarioCadastro} alt='voluntarioCadastro' className={styles.imagemCadastro}></img>
                        </Botao>
                    </Link>
                    <Link to='../cadastro-doador' className={styles.link}>
                        <Botao estilo='imagemCadastro'>
                            <img src={doadorCadastro} alt='doadorCadastro' className={styles.imagemCadastro}></img>
                        </Botao>
                    </Link>
                    <Link to='../cadastro-empresa' className={styles.link}>
                        <Botao estilo='imagemCadastro'>
                            <img src={empresaCadastro} alt='empresaCadastro' className={styles.imagemCadastro}></img>
                        </Botao>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ConteudoTodosCadastros;