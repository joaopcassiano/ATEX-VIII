import Botao from '../../Componentes/Botao/Botao';
import styles from './_home.module.css';
import bannerHome from '../../assets/bannerHome.png';
import empresaCarrosel from '../../assets/empresaCarrosel.png';
import voluntarioCarrosel from '../../assets/voluntarioCarrosel.png';
import doadorCarrosel from '../../assets/doadorCarrosel.png';
import maosBoxs from '../../assets/maosBoxs.png';
import coracaoBoxs from '../../assets/coracaoBoxs.png';
import sociedadeBoxs from '../../assets/sociedadeBoxs.png';
import doadorAjuda from '../../assets/doadorAjuda.png';
import voluntarioAjuda from '../../assets/voluntarioAjuda.png';
import empresaAjuda from '../../assets/empresaAjuda.png';
import fotoAjudado from '../../assets/fotoAjudado.png';
import TopBar from '../../Componentes/TopBar/TopBar';
import { useEffect, useState } from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useSwipeable } from 'react-swipeable';
import { FiNavigation2 } from "react-icons/fi";
import empresaCadastro from '../../assets/empresaCadastro.png';
import doadorCadastro from '../../assets/doadorCadastro.png';
import voluntarioCadastro from '../../assets/voluntarioCadastro.png';
import beneficiarioCadastro from '../../assets/beneficiarioCadastro.png';
import imagemCadastro from '../../assets/imagemCadastro.png';
import InputMask from 'react-input-mask';
import { BsPerson } from "react-icons/bs";

const Home = () => {

    const [opcao, setOpcao] = useState(1);
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

    const handlers = useSwipeable({
        onSwipedLeft: proximaImagem,
        onSwipedRight: imagemAnterior
    });

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
                                        <div className={styles.carrosel}>
                                            <div className={styles.imagens} {...handlers}>
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
                                                <div className={styles.boxAjuda}>
                                                    <img className={styles.imagemAjuda} src={empresaAjuda} alt='empresaAjuda'></img>
                                                    <div className={styles.textoAjuda}>Empresa</div>
                                                </div>
                                                <div className={styles.boxAjuda}>
                                                    <img className={styles.imagemAjuda} src={voluntarioAjuda} alt='voluntarioAjuda'></img>
                                                    <div className={styles.textoAjuda}>Voluntário</div>
                                                </div>
                                                <div className={styles.boxAjuda}>
                                                    <img className={styles.imagemAjuda} src={doadorAjuda} alt='doadorAjuda'></img>
                                                    <div className={styles.textoAjuda}>Doadores</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    opcao === 4 ?
                                        <>
                                            <div className={styles.ajudado}>
                                                <img className={styles.fotoAjudado} src={fotoAjudado} alt='fotoAjuda'></img>
                                                <div className={styles.blocoAjudado}>
                                                    <div className={styles.tituloAjudado}>Transformando Vidas</div>
                                                    <div className={styles.subtituloAjudado}>O Sistema +Apoio está aqui para oferecer suporte a quem mais precisa. Para ser elegível aos nossos programas, verifique se você se enquadra nas seguintes condições:</div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div className={styles.textoTextoAjudado}>
                                                            Renda Mensal: Sua renda familiar deve ser inferior a 1,5 salário mínimo.
                                                        </div>
                                                    </div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div >
                                                            Desemprego: Se você está desempregado há mais de 6 meses.
                                                        </div>
                                                    </div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div className={styles.textoTextoAjudado}>
                                                            Responsabilidade Familiar: Ter 3 ou mais dependentes.
                                                        </div>
                                                    </div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div className={styles.textoTextoAjudado}>
                                                            Moradia: Pessoas em situação de moradia precária ou sem moradia fixa são elegíveis.
                                                        </div>
                                                    </div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div className={styles.textoTextoAjudado}>
                                                            Vulnerabilidade Social: Pessoas cadastradas em programas de assistência governamental ou classificadas como vulneráveis pelo CRAS têm prioridade.
                                                        </div>
                                                    </div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div className={styles.textoTextoAjudado}>
                                                            Saúde: Indivíduos com problemas de saúde que impactam sua capacidade de trabalho, ou cuidadores de pessoas com doenças crônicas.
                                                        </div>
                                                    </div>
                                                    <div className={styles.textoAjudado}>
                                                        <div className={styles.iconeTextoAjudado}>
                                                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                                        </div>
                                                        <div className={styles.textoTextoAjudado}>
                                                            Região Geográfica: Moradores de áreas rurais ou comunidades de baixa renda.
                                                        </div>
                                                    </div>
                                                    <div className={styles.descricaoAjudado}>Se você se enquadra em algum desses requisitos,  cadastre-se como beneficiário:</div>
                                                    <div className={styles.botaoAjudado}>
                                                        <Botao onClick={() => { setOpcao(6) }} estilo='cadastrarAjudado'>Quero me cadastrar como beneficiário</Botao>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        opcao === 5 ?
                                            <>
                                            </>
                                            :
                                            opcao === 6 ?
                                                <>
                                                    <div className={styles.conteudoCadastro}>
                                                        <div className={styles.tituloCadastro}>
                                                            Selecione a opção para cadastrar
                                                        </div>
                                                        <div className={styles.boxsCadastro}>
                                                            <Botao onClick={() => setOpcao(7)} estilo='imagemCadastro'>
                                                                <img src={beneficiarioCadastro} alt='beneficiarioCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                            <Botao estilo='imagemCadastro'>
                                                                <img src={voluntarioCadastro} alt='voluntarioCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                            <Botao estilo='imagemCadastro'>
                                                                <img src={doadorCadastro} alt='doadorCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                            <Botao estilo='imagemCadastro'>
                                                                <img src={empresaCadastro} alt='empresaCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                opcao === 7 ?
                                                    <>
                                                        <div className={styles.conteudoCadastroBeneficiario}>
                                                            <div className={styles.cadastroBeneficiario}>
                                                                <div className={styles.formsCadastro}>
                                                                    <form>
                                                                        <div>
                                                                            Cadastro
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro}/></label>
                                                                            <InputMask type='text' placeholder='Nome Completo' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <img className={styles.fotoCadastro} src={imagemCadastro} alt='imagemCadastro'></img>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                    }

                </div>
            </div >
        </>
    )
}

export default Home;