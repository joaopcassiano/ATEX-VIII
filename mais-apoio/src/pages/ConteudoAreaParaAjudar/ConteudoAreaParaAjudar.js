import styles from './_conteudoAreaParaAjudar.module.css';
import empresaCarrosel from '../../assets/empresaCarrosel.png';
import voluntarioCarrosel from '../../assets/voluntarioCarrosel.png';
import doadorCarrosel from '../../assets/doadorCarrosel.png';
import doadorAjuda from '../../assets/doadorAjuda.png';
import voluntarioAjuda from '../../assets/voluntarioAjuda.png';
import empresaAjuda from '../../assets/empresaAjuda.png';
import Botao from '../../Componentes/Botao/Botao';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
;

const ConteudoAreaParaAjudar = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <div className={styles.carrosel}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img src={voluntarioCarrosel} alt="Imagem Voluntario" className={styles.imagensCarrosel} />         
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={doadorCarrosel} alt="Imagem Doadores" className={styles.imagensCarrosel} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={empresaCarrosel} alt="Imagem Empresa" className={styles.imagensCarrosel} />
                    </Carousel.Item>
                </Carousel>
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
            </div>
        </>
    )
}

export default ConteudoAreaParaAjudar;
