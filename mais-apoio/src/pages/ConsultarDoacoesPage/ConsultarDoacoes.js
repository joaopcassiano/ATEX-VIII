import { useOutletContext } from 'react-router-dom';
import Botao from '../../Componentes/Botao/Botao';
import styles from './_consultarDoacoes.module.css';
import InputMask from 'react-input-mask';

const ConsultarDoacoes = () => {
    const { beneficiario, atualizar, editar } = useOutletContext();

    return (
        <div className={styles.conteudo}>
            <div className={styles.titulo_maior}>
                    Histórico de doações
                </div>
            <div className={styles.cabeca}>
                <div className={styles.linha}>
                    <InputMask
                        type='text'
                        placeholder='Nome doador'
                        className={styles.inputPesquisa} />
                    <InputMask
                        type='date'
                        placeholder='Data da doação'
                        className={styles.inputPesquisa} />
                </div>
                <div className={styles.linha}>
                    <InputMask
                        type='text'
                        placeholder='Item da doacao'
                        className={styles.inputPesquisa} />
                    <Botao estilo='pesquisar' >Pesquisar</Botao>
                </div>
            </div>
            <div className={styles.corpo}>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>

                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>

                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                <div className={styles.itens}>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Nome: </p> <p> Anderson Caproni</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Item doação: </p> <p>Agua</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.titulo} >Data doação: </p> <p>28/08/2010</p>
                    </div>
                </div>
                

            </div>

        </div>
    )
}

export default ConsultarDoacoes;