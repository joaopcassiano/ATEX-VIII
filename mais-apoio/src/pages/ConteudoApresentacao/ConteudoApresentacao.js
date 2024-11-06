import styles from './_conteudoApresentacao.module.css';
import bannerHome from '../../assets/bannerHome.png';
import { Link } from 'react-router-dom';
import Botao from '../../Componentes/Botao/Botao';
import maosBoxs from '../../assets/maosBoxs.png';
import coracaoBoxs from '../../assets/coracaoBoxs.png';
import sociedadeBoxs from '../../assets/sociedadeBoxs.png';

const ConteudoApresentacao = () => {
    return (
        <>
            <img className={styles.bannerImagem} src={bannerHome} alt='BannerApoio' />
            <div className={styles.botoesConteudo}>
                <Link to='../quero-ajudar' className={styles.link}>
                    <Botao estilo='botaoBrancoHome' >Quero Ajudar</Botao>
                </Link>
                <Link to='../preciso-de-ajuda' className={styles.link}>
                    <Botao estilo='botaoAzulHome' >Preciso de ajuda</Botao>
                </Link>
            </div>
            <div className={styles.infos}>
                <p className={styles.tituloInfo}>
                    Por que ajudar?
                </p>
                <div className={styles.boxs}>
                    <div className={styles.box}>
                        <img className={styles.imagemBox} src={maosBoxs} alt='MaosDadas'></img>
                        <div className={styles.textoInfo}>
                            <p className={styles.tituloTextoInfo}>
                                Fomentar a soliedariedade
                            </p>
                            <p className={styles.textoTextoInfo}>
                                Ajudar o próximo cria uma rede de apoio,
                                fortalecendo laços comunitários e
                                promovendo um senso de pertencimento.
                            </p>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <img className={styles.imagemBox} src={coracaoBoxs} alt='Ajuda'></img>
                        <div className={styles.textoInfo}>
                            <p className={styles.tituloTextoInfo}>
                                Transformar vidas
                            </p>
                            <p className={styles.textoTextoInfo}>
                                Cada gesto de ajuda pode ter um impacto
                                significativo na vida de alguém, oferecendo
                                oportunidades, esperança e recursos.
                            </p>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <img className={styles.imagemBox} src={sociedadeBoxs} alt='Colaboração'></img>
                        <div className={styles.textoInfo}>
                            <p className={styles.tituloTextoInfo}>
                                Criar um ciclo positivo
                            </p>
                            <p className={styles.textoTextoInfo}>
                                Ajudar inspira outras pessoas a fazerem o
                                mesmo, ampliando a solidariedade
                                e a empatia na comunidade.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConteudoApresentacao;