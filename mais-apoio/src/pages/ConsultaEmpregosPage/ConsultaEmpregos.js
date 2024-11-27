import Botao from '../../Componentes/Botao/Botao';
import styles from './_consultaEmpregos.module.css';
import InputMask from 'react-input-mask';

const ConsultarEmpregos = () => {
    return (
        <div className={styles.conteudo}>
            <div className={styles.titulo_maior}>
                    Histórico de empregos
                </div>
            <div className={styles.cabeca}>
                <div className={styles.linha}>
                    <InputMask
                        type='text'
                        placeholder='Nome da empresa'
                        className={styles.inputPesquisa} />
                    <InputMask
                        type='date'
                        placeholder='Data de contratação'
                        className={styles.inputPesquisa} />
                </div>
                <div className={styles.linha}>
                    <InputMask
                        type='text'
                        placeholder='Cargo'
                        className={styles.inputPesquisa} />
                    <Botao estilo='pesquisar' >Pesquisar</Botao>
                </div>
            </div>
            <div className={styles.corpo}>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome da empresa: </p> <p>Empresa A</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Cargo: </p> <p>Desenvolvedor</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data de contratação: </p> <p>28/08/2020</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome da empresa: </p> <p>Empresa B</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Cargo: </p> <p>Analista de TI</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data de contratação: </p> <p>12/11/2022</p>
                    </div>
                </div>

                {/* Replicar o formato dos itens de empregos conforme necessário */}
            </div>
        </div>
    )
}

export default ConsultarEmpregos;
