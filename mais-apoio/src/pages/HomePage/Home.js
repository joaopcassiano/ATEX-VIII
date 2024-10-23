import Botao from '../../Componentes/Botao/Botao';
import styles from './_home.module.css';
import bannerHome from '../../assets/bannerHome.png';
import bannerSobreApoio from '../../assets/bannerSobreApoio.png';
import maosBoxs from '../../assets/maosBoxs.png';
import coracaoBoxs from '../../assets/coracaoBoxs.png';
import sociedadeBoxs from '../../assets/sociedadeBoxs.png';
import TopBar from '../../Componentes/TopBar/TopBar';
import { useState } from 'react';

const Home = () => {
    const [opcao, setOpcao] = useState(1);

    return (
        <>
            <div className={styles.corpo}>
                <TopBar valor={(x) => { setOpcao(x) }} />
                <div className={styles.conteudo}>
                    {
                        opcao === 1 ?
                            <>
                                <img className={styles.bannerImagem} src={bannerHome} alt='BannerApoio' />
                                <div className={styles.botoesConteudo}>
                                    <Botao estilo='botaoBrancoHome' >Quero Ajudar</Botao>
                                    <Botao estilo='botaoAzulHome' >Preciso de ajuda</Botao>
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
                            :
                            opcao === 2 ?
                                <>

                                    <div className={styles.textoBannerSobreApoio}>
                                        <p className={styles.tituloTextoBannerSobreApoio}>
                                            Sobre o +APOIO
                                        </p>
                                        <p className={styles.textoTextoBannerSobreApoio}>
                                            O Sistema +Apoio foi idealizado por um grupo de estudantes do 4º período de Ciências da Computação, que compartilharam a visão de criar uma plataforma capaz de fazer a diferença na vida de pessoas em situação de vulnerabilidade. Com a missão de conectar esses indivíduos a oportunidades essenciais, nossa iniciativa se baseia na solidariedade e na colaboração, promovendo um impacto positivo em nossas comunidades.
                                        </p>
                                    </div>
                                    <div className={styles.texts}>
                                        <div className={styles.text}>
                                            <div className={styles.tituloText}>
                                                <div className={styles.tituloText1}>
                                                    QUEM
                                                </div>
                                                <div className={styles.tituloText2}>
                                                    SOMOS?
                                                </div>
                                            </div>
                                            <div className={styles.textoText}>
                                                O Sistema +Apoio é uma plataforma que conecta pessoas em situação de vulnerabilidade a oportunidades essenciais, promovendo solidariedade e colaboração.
                                            </div>
                                        </div>
                                        <div className={styles.text}>
                                            <div className={styles.tituloText}>
                                                <div className={styles.tituloText1}>
                                                    O QUE
                                                </div>
                                                <div className={styles.tituloText2}>
                                                    FAZEMOS?
                                                </div>
                                            </div>
                                            <div className={styles.textoText}>
                                                No Sistema +Apoio, conectamos beneficiários, doadores e voluntários. Oferecemos a chance de fazer doações a projetos sociais, ser voluntário em organizações e ajudar pessoas vulneráveis a encontrar empregos.
                                            </div>
                                        </div>
                                        <div className={styles.text}>
                                            <div className={styles.tituloText}>
                                                <div className={styles.tituloText1}>
                                                    COMO
                                                </div>
                                                <div className={styles.tituloText2}>
                                                    ME INSCREVO?
                                                </div>
                                            </div>
                                            <div className={styles.textoText}>
                                                Para se inscrever, acesse nossa plataforma e crie uma conta, escolhendo entre doador, voluntário ou beneficiário. Depois, explore as oportunidades e ajude a transformar vidas.
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.descricaoSobre}>
                                        Junte-se a nós! Cada ação conta. Seja você um doador, voluntário ou alguém em busca de oportunidades, sua participação é fundamental para transformar realidades.
                                    </div>
                                </>
                                :
                                opcao === 3 ?
                                <>
                                to aqui
                                </>
                                :
                                <>
                                </>
                    }

                </div>
            </div>
        </>
    )
}

export default Home;