import styles from './_conteudoAreaParaAjudar.module.css';
import empresaCarrosel from '../../assets/empresaCarrosel.png';
import voluntarioCarrosel from '../../assets/voluntarioCarrosel.png';
import doadorCarrosel from '../../assets/doadorCarrosel.png';
import doadorAjuda from '../../assets/doadorAjuda.png';
import voluntarioAjuda from '../../assets/voluntarioAjuda.png';
import empresaAjuda from '../../assets/empresaAjuda.png';
import Botao from '../../Componentes/Botao/Botao';
import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ConteudoAreaParaAjudar = () => {
    const [indice, setIndice] = useState(0);

    const Cor = {
        escuro: styles.escuro,
        claro: styles.claro
    }

    const imagensCarrosel = [
        empresaCarrosel,
        doadorCarrosel,
        voluntarioCarrosel
    ]

    const proximaImagem = () => {
        setIndice((indiceAtual) => (indiceAtual + 1) % imagensCarrosel.length);
    };

    const imagemAnterior = () => {
        setIndice((indiceAtual) =>
            indiceAtual === 0 ? imagensCarrosel.length - 1 : indiceAtual - 1
        );
    };

    useEffect(() => {
        const intervalo = setInterval(proximaImagem, 5000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <>
            <div className={styles.carrosel}>
                <div className={styles.imagens}>
                    <img src={imagensCarrosel[indice]} alt={`Imagem ${indice + 1}`} className={styles.imagensCarrosel} />
                    <Botao onClick={imagemAnterior} estilo='setaEsquerda'><BsChevronLeft style={{ fontSize: '3rem', margin: '0', padding: '0', color: '#ffffff', cursor: 'pointer' }} /></Botao>
                    <Botao onClick={proximaImagem} estilo='setaDireita'><BsChevronRight style={{ fontSize: '3rem', margin: '0', padding: '0', color: '#ffffff', cursor: 'pointer' }} /></Botao>

                </div>
                <div className={styles.bolas}>
                    <div className={styles.bola}>
                        <button onClick={() => setIndice(0)} className={`${styles.bola1} ${indice === 0 ? Cor['escuro'] : Cor['claro']}`}></button>
                    </div>
                    <div className={styles.bola}>
                        <button onClick={() => { setIndice(1) }} className={`${styles.bola2} ${indice === 1 ? Cor['escuro'] : Cor['claro']}`}></button>
                    </div>
                    <div className={styles.bola}>
                        <button onClick={() => { setIndice(2) }} className={`${styles.bola3} ${indice === 2 ? Cor['escuro'] : Cor['claro']}`}></button>
                    </div>
                </div>
            </div>

            <div className={styles.linkAjuda}>
                <div className={styles.tituloAjuda}>
                    Quero me candidatar como:
                </div>
                <div className={styles.boxsAjuda}>
                    <Link to='../cadastro-empresa' className={styles.link}>
                        <Botao estilo='boxAjuda'>
                            <img className={styles.imagemAjuda} src={empresaAjuda} alt='empresaAjuda'></img>
                            <div className={styles.textoAjuda}>Empresa</div>
                        </Botao>
                    </Link>
                    <Link to='../cadastro-voluntario' className={styles.link}>
                        <Botao estilo='boxAjuda'>
                            <img className={styles.imagemAjuda} src={voluntarioAjuda} alt='voluntarioAjuda'></img>
                            <div className={styles.textoAjuda}>Voluntário</div>
                        </Botao>
                    </Link>
                    <Link to='../cadastro-doador' className={styles.link}>
                        <Botao estilo='boxAjuda'>
                            <img className={styles.imagemAjuda} src={doadorAjuda} alt='doadorAjuda'></img>
                            <div className={styles.textoAjuda}>Doadores</div>
                        </Botao>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default ConteudoAreaParaAjudar;