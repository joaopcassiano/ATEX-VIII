import Botao from '../../Componentes/Botao/Botao';
import logo from '../../assets/logo.png';
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
import { useEffect, useRef, useState } from 'react';
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
import { BsPersonPlus } from "react-icons/bs";
import { FiAtSign } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { PiHouseLight } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import { NumericFormat } from 'react-number-format';
import { BsArrowReturnRight } from "react-icons/bs";
import AcharCep from '../../Services/Endereco'
import { FaNetworkWired } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import { IoIosStarOutline } from "react-icons/io";
import { BsX } from "react-icons/bs";

const Home = () => {
    const [visivelEndereco, setVisivelEndereco] = useState(false)
    const [visivelLogin, setVisivelLogin] = useState(false)
    const [opcao, setOpcao] = useState(1);
    const [indice, setIndice] = useState(0);
    const campoEnderecoRef = useRef(null);
    const botaoEnderecoRef = useRef(null);
    const xRef = useRef(null);
    const [cep, setCep] = useState('');
    const [temRua, setTemRua] = useState(true);
    const [temBairro, setTemBairro] = useState(true);
    const [placeEndereco, setPlaceEndereco] = useState('Endereço');
    const escuroRef = useRef(null);
    const boxLoginRef = useRef(null);
    const [tipoUsuario, setTipoUsuario] = useState(1);
    const [trocarSenha, setTrocarSenha] = useState(1);

    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: '',
        cep: ''
    });

    const Cor = {
        escuro: styles.escuro,
        claro: styles.claro,
        bolaEscura: styles.bolaEscura,
        bolaClara: styles.bolaClara
    }

    const imagensCarrosel = [
        empresaCarrosel,
        doadorCarrosel,
        voluntarioCarrosel
    ]

    useEffect(() => {
        if (endereco.cep === '') {
            setPlaceEndereco('Endereço')
        }
        else if (endereco.bairro === '' || endereco.numero === '' || endereco.complemento === '' || endereco.rua === '' || endereco.cidade === '' || endereco.estado === '') {
            if (endereco.cep === undefined) {
                setPlaceEndereco('Endereço')
            }
            else {
                setPlaceEndereco('Preencha todos os dados')
            }
            console.log("aaaaaaaaaaaaaaaaaaaaa   " + endereco.cep)

        } else if (endereco.bairro !== '' && endereco.numero !== '' && endereco.complemento !== '' && endereco.rua !== '' && endereco.cidade !== '' && endereco.estado !== '' && endereco.cep !== '') {

            setPlaceEndereco(endereco.rua + ' - ' + endereco.numero + ', ' + endereco.bairro + ', ' + endereco.cidade + '-' + endereco.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [endereco])

    useEffect(() => {
        const intervalo = setInterval(proximaImagem, 5000);
        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickFora);

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    const handleCepChange = async (e) => {
        const cepDigitado = e.target.value.replace(/\D/g, '');
        setCep(cepDigitado);
        console.log(cepDigitado.length)
        if (cepDigitado.length === 8) {
            try {
                const response = await AcharCep(cepDigitado)
                if (response.data.erro) {
                    setTemRua(true);
                    setTemBairro(true);
                    setEndereco({
                        rua: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        numero: '',
                        complemento: ''
                    });
                } else {
                    setEndereco({
                        ...endereco,
                        rua: response.data.logradouro || '',
                        bairro: response.data.bairro || '',
                        cidade: response.data.localidade || '',
                        estado: response.data.uf,
                        numero: '',
                        complemento: '',
                        cep: cepDigitado
                    });
                    setTemBairro(false);
                    setTemRua(false);
                }
            } catch (error) {
                setTemRua(true);
                setTemBairro(true);
                console.error('Erro na consulta do CEP:', error);
            }
        } else {
            setEndereco({
                rua: '',
                bairro: '',
                cidade: '',
                estado: '',
                numero: '',
                complemento: ''
            });
            setTemRua(true);
            setTemBairro(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEndereco({ ...endereco, [name]: value });
    };

    const enderecoVisivel = () => {
        setVisivelEndereco((prev) => !prev);
    };

    const handleClickFora = (e) => {
        if (
            campoEnderecoRef.current &&
            !campoEnderecoRef.current.contains(e.target) &&
            !botaoEnderecoRef.current.contains(e.target)
        ) {
            setVisivelEndereco(false);
        }
    };

    const fecharBoxLogin = (event) => {
        if (boxLoginRef.current && !boxLoginRef.current.contains(event.target)) {
            setVisivelLogin(false);
            setTrocarSenha(1);
        }
    };

    const proximaImagem = () => {
        setIndice((indiceAtual) => (indiceAtual + 1) % imagensCarrosel.length);
    };

    const imagemAnterior = () => {
        setIndice((indiceAtual) =>
            indiceAtual === 0 ? imagensCarrosel.length - 1 : indiceAtual - 1
        );
    };

    const handlers = useSwipeable({
        onSwipedLeft: proximaImagem,
        onSwipedRight: imagemAnterior
    });

    return (
        <>
            <div className={styles.corpo}>
                <TopBar valor={(x) => { setOpcao(x) }} valorLogin={(a) => { setVisivelLogin(a); setTrocarSenha(1); }} />
                <div className={styles.conteudo}>
                    {
                        opcao === 1 ?
                            <>
                                <img className={styles.bannerImagem} src={bannerHome} alt='BannerApoio' />
                                <div className={styles.botoesConteudo}>
                                    <Botao onClick={() => setOpcao(3)} estilo='botaoBrancoHome' >Quero Ajudar</Botao>
                                    <Botao onClick={() => setOpcao(4)} estilo='botaoAzulHome' >Preciso de ajuda</Botao>
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
                                                <Botao onClick={() => setOpcao(10)} estilo='boxAjuda'>
                                                    <img className={styles.imagemAjuda} src={empresaAjuda} alt='empresaAjuda'></img>
                                                    <div className={styles.textoAjuda}>Empresa</div>
                                                </Botao>
                                                <Botao onClick={() => setOpcao(8)} estilo='boxAjuda'>
                                                    <img className={styles.imagemAjuda} src={voluntarioAjuda} alt='voluntarioAjuda'></img>
                                                    <div className={styles.textoAjuda}>Voluntário</div>
                                                </Botao>
                                                <Botao onClick={() => setOpcao(7)} estilo='boxAjuda'>
                                                    <img className={styles.imagemAjuda} src={doadorAjuda} alt='doadorAjuda'></img>
                                                    <div className={styles.textoAjuda}>Doadores</div>
                                                </Botao>
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
                                                        <Botao onClick={() => { setOpcao(9) }} estilo='cadastrarAjudado'>Quero me cadastrar como beneficiário</Botao>
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
                                                            <Botao onClick={() => setOpcao(8)} estilo='imagemCadastro'>
                                                                <img src={voluntarioCadastro} alt='voluntarioCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                            <Botao onClick={() => setOpcao(9)} estilo='imagemCadastro'>
                                                                <img src={doadorCadastro} alt='doadorCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                            <Botao onClick={() => setOpcao(10)} estilo='imagemCadastro'>
                                                                <img src={empresaCadastro} alt='empresaCadastro' className={styles.imagemCadastro}></img>
                                                            </Botao>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                opcao === 7 ?
                                                    <>
                                                        <div className={styles.conteudoCadastroUsuario}>
                                                            <div className={styles.cadastroUsuario}>
                                                                <div className={styles.formsCadastro}>
                                                                    <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                                                                        <div className={styles.cadastroForms}>
                                                                            Cadastro
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                                                            <InputMask type='text' placeholder='Nome Completo' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                                                            <InputMask mask='999.999.999-99' type='text' placeholder='CPF' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                                                            <InputMask type='email' placeholder='Digite seu E-mail' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                                                            <InputMask type='password' placeholder='Digite sua Senha' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                                                                            <InputMask type='date' placeholder='Data de Nascimento' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                        <div className={styles.inputEndereco}>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><PiHouseLight className={styles.iconeCadastro} /></label>
                                                                                <Botao referencia={botaoEnderecoRef} onClick={enderecoVisivel} estilo='inputCadastro'>{placeEndereco}</Botao>
                                                                            </div>
                                                                            {
                                                                                visivelEndereco &&
                                                                                (
                                                                                    <div ref={campoEnderecoRef} className={styles.boxEndereco}>
                                                                                        <div className={styles.maiorBoxEndereco}>
                                                                                            <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                            <div className={styles.inputMaiorBoxEndereco}>
                                                                                                <InputMask
                                                                                                    maxLength="8"
                                                                                                    type="text"
                                                                                                    placeholder='CEP'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={cep}
                                                                                                    onChange={handleCepChange}
                                                                                                />
                                                                                                <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                <InputMask
                                                                                                    placeholder='Número'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={endereco.numero}
                                                                                                    name="numero"
                                                                                                    type="number"
                                                                                                    onChange={handleInputChange}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={styles.maiorBoxEndereco}>
                                                                                            <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                            <div className={styles.inputMaiorBoxEndereco}>
                                                                                                <InputMask
                                                                                                    placeholder='Rua'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={endereco.rua}
                                                                                                    name="rua"
                                                                                                    onChange={handleInputChange}
                                                                                                    type="text"
                                                                                                    readOnly={(temRua === true && endereco.cep !== '')}
                                                                                                />
                                                                                                <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                <InputMask
                                                                                                    placeholder='Complemento'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={endereco.complemento}
                                                                                                    name="complemento"
                                                                                                    onChange={handleInputChange}
                                                                                                    type="text"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={styles.maiorBoxEndereco}>
                                                                                            <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                            <div className={styles.inputMaiorBoxEndereco}>
                                                                                                <InputMask
                                                                                                    placeholder='Cidade'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={endereco.cidade}
                                                                                                    name="cidade"
                                                                                                    readOnly
                                                                                                    type="text"
                                                                                                />
                                                                                                <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                <InputMask
                                                                                                    placeholder='Bairro'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={endereco.bairro}
                                                                                                    name="bairro"
                                                                                                    type="text"
                                                                                                    onChange={handleInputChange}
                                                                                                    readOnly={(temBairro === true && endereco.cep !== '')}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={styles.maiorBoxEndereco}>
                                                                                            <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                            <div className={styles.inputMaiorBoxEndereco}>
                                                                                                <InputMask
                                                                                                    placeholder='Estado'
                                                                                                    className={styles.inputBoxEndereco}
                                                                                                    value={endereco.estado}
                                                                                                    name="estado"
                                                                                                    readOnly
                                                                                                    type="text"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><IoCallOutline className={styles.iconeCadastro} /></label>
                                                                            <InputMask mask='(99) 99999-9999' type='text' placeholder='telefone' className={styles.inputCadastro}></InputMask>
                                                                        </div>
                                                                        <div className={styles.cadaInput}>
                                                                            <label className={styles.labelCadastro}><LuDollarSign className={styles.iconeCadastro} /></label>
                                                                            <NumericFormat thousandSeparator="." decimalSeparator="," prefix="R$ " decimalScale={2} fixedDecimalScale={true} allowNegative={false} placeholder='Situação econômica' className={styles.inputCadastro} />
                                                                        </div>
                                                                        <Botao estilo='cadastrarConfirma'>Cadastra-se</Botao>
                                                                    </form>
                                                                </div>
                                                                <img className={styles.fotoCadastro} src={imagemCadastro} alt='imagemCadastro'></img>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    opcao === 8 ?
                                                        <>
                                                            <div className={styles.conteudoCadastroUsuario}>
                                                                <div className={styles.cadastroUsuario}>
                                                                    <div className={styles.formsCadastro}>
                                                                        <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                                                                            <div className={styles.cadastroForms}>
                                                                                Cadastro
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                                                                <InputMask type='text' placeholder='Nome Completo' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                                                                <InputMask mask='999.999.999-99' type='text' placeholder='CPF' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                                                                <InputMask type='email' placeholder='Digite seu E-mail' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                                                                <InputMask type='password' placeholder='Digite sua Senha' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                                                                                <InputMask type='date' placeholder='Data de Nascimento' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <div className={styles.inputEndereco}>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><PiHouseLight className={styles.iconeCadastro} /></label>
                                                                                    <Botao referencia={botaoEnderecoRef} onClick={enderecoVisivel} estilo='inputCadastro'>{placeEndereco}</Botao>
                                                                                </div>
                                                                                {
                                                                                    visivelEndereco &&
                                                                                    (
                                                                                        <div ref={campoEnderecoRef} className={styles.boxEndereco}>
                                                                                            <div className={styles.maiorBoxEndereco}>
                                                                                                <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                                <div className={styles.inputMaiorBoxEndereco}>
                                                                                                    <InputMask
                                                                                                        maxLength="8"
                                                                                                        type="text"
                                                                                                        placeholder='CEP'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={cep}
                                                                                                        onChange={handleCepChange}
                                                                                                    />
                                                                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                    <InputMask
                                                                                                        placeholder='Número'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={endereco.numero}
                                                                                                        name="numero"
                                                                                                        type="number"
                                                                                                        onChange={handleInputChange}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={styles.maiorBoxEndereco}>
                                                                                                <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                                <div className={styles.inputMaiorBoxEndereco}>
                                                                                                    <InputMask
                                                                                                        placeholder='Rua'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={endereco.rua}
                                                                                                        name="rua"
                                                                                                        onChange={handleInputChange}
                                                                                                        type="text"
                                                                                                        readOnly={(temRua === true && endereco.cep !== '')}
                                                                                                    />
                                                                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                    <InputMask
                                                                                                        placeholder='Complemento'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={endereco.complemento}
                                                                                                        name="complemento"
                                                                                                        onChange={handleInputChange}
                                                                                                        type="text"
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={styles.maiorBoxEndereco}>
                                                                                                <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                                <div className={styles.inputMaiorBoxEndereco}>
                                                                                                    <InputMask
                                                                                                        placeholder='Cidade'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={endereco.cidade}
                                                                                                        name="cidade"
                                                                                                        readOnly
                                                                                                        type="text"
                                                                                                    />
                                                                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                    <InputMask
                                                                                                        placeholder='Bairro'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={endereco.bairro}
                                                                                                        name="bairro"
                                                                                                        type="text"
                                                                                                        onChange={handleInputChange}
                                                                                                        readOnly={(temBairro === true && endereco.cep !== '')}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={styles.maiorBoxEndereco}>
                                                                                                <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                                <div className={styles.inputMaiorBoxEndereco}>
                                                                                                    <InputMask
                                                                                                        placeholder='Estado'
                                                                                                        className={styles.inputBoxEndereco}
                                                                                                        value={endereco.estado}
                                                                                                        name="estado"
                                                                                                        readOnly
                                                                                                        type="text"
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><IoCallOutline className={styles.iconeCadastro} /></label>
                                                                                <InputMask mask='(99) 99999-9999' type='text' placeholder='telefone' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <div className={styles.cadaInput}>
                                                                                <label className={styles.labelCadastro}><FaNetworkWired className={styles.iconeCadastro} /></label>
                                                                                <InputMask type='text' placeholder='Área de atuação' className={styles.inputCadastro}></InputMask>
                                                                            </div>
                                                                            <Botao estilo='cadastrarConfirma'>Cadastra-se</Botao>
                                                                        </form>
                                                                    </div>
                                                                    <img className={styles.fotoCadastro} src={imagemCadastro} alt='imagemCadastro'></img>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        opcao === 9 ?
                                                            <>
                                                                <div className={styles.conteudoCadastroUsuario}>
                                                                    <div className={styles.cadastroUsuario}>
                                                                        <div className={styles.formsCadastro}>
                                                                            <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                                                                                <div className={styles.cadastroForms}>
                                                                                    Cadastro
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                                                                    <InputMask type='text' placeholder='Nome Completo' className={styles.inputCadastro}></InputMask>
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                                                                    <InputMask mask='999.999.999-99' type='text' placeholder='CPF' className={styles.inputCadastro}></InputMask>
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                                                                    <InputMask type='email' placeholder='Digite seu E-mail' className={styles.inputCadastro}></InputMask>
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                                                                    <InputMask type='password' placeholder='Digite sua Senha' className={styles.inputCadastro}></InputMask>
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                                                                                    <InputMask type='date' placeholder='Data de Nascimento' className={styles.inputCadastro}></InputMask>
                                                                                </div>
                                                                                <div className={styles.inputEndereco}>
                                                                                    <div className={styles.cadaInput}>
                                                                                        <label className={styles.labelCadastro}><PiHouseLight className={styles.iconeCadastro} /></label>
                                                                                        <Botao referencia={botaoEnderecoRef} onClick={enderecoVisivel} estilo='inputCadastro'>{placeEndereco}</Botao>
                                                                                    </div>
                                                                                    {
                                                                                        visivelEndereco &&
                                                                                        (
                                                                                            <div ref={campoEnderecoRef} className={styles.boxEndereco}>
                                                                                                <div className={styles.maiorBoxEndereco}>
                                                                                                    <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                                    <div className={styles.inputMaiorBoxEndereco}>
                                                                                                        <InputMask
                                                                                                            maxLength="8"
                                                                                                            type="text"
                                                                                                            placeholder='CEP'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={cep}
                                                                                                            onChange={handleCepChange}
                                                                                                        />
                                                                                                        <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                        <InputMask
                                                                                                            placeholder='Número'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={endereco.numero}
                                                                                                            name="numero"
                                                                                                            type="number"
                                                                                                            onChange={handleInputChange}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className={styles.maiorBoxEndereco}>
                                                                                                    <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                                    <div className={styles.inputMaiorBoxEndereco}>
                                                                                                        <InputMask
                                                                                                            placeholder='Rua'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={endereco.rua}
                                                                                                            name="rua"
                                                                                                            onChange={handleInputChange}
                                                                                                            type="text"
                                                                                                            readOnly={(temRua === true && endereco.cep !== '')}
                                                                                                        />
                                                                                                        <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                        <InputMask
                                                                                                            placeholder='Complemento'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={endereco.complemento}
                                                                                                            name="complemento"
                                                                                                            onChange={handleInputChange}
                                                                                                            type="text"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className={styles.maiorBoxEndereco}>
                                                                                                    <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                                    <div className={styles.inputMaiorBoxEndereco}>
                                                                                                        <InputMask
                                                                                                            placeholder='Cidade'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={endereco.cidade}
                                                                                                            name="cidade"
                                                                                                            readOnly
                                                                                                            type="text"
                                                                                                        />
                                                                                                        <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                        <InputMask
                                                                                                            placeholder='Bairro'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={endereco.bairro}
                                                                                                            name="bairro"
                                                                                                            type="text"
                                                                                                            onChange={handleInputChange}
                                                                                                            readOnly={(temBairro === true && endereco.cep !== '')}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className={styles.maiorBoxEndereco}>
                                                                                                    <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                                    <div className={styles.inputMaiorBoxEndereco}>
                                                                                                        <InputMask
                                                                                                            placeholder='Estado'
                                                                                                            className={styles.inputBoxEndereco}
                                                                                                            value={endereco.estado}
                                                                                                            name="estado"
                                                                                                            readOnly
                                                                                                            type="text"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><IoCallOutline className={styles.iconeCadastro} /></label>
                                                                                    <InputMask mask='(99) 99999-9999' type='text' placeholder='telefone' className={styles.inputCadastro}></InputMask>
                                                                                </div>
                                                                                <div className={styles.cadaInput}>
                                                                                    <label className={styles.labelCadastro}><BiDonateHeart className={styles.iconeCadastro} /></label>
                                                                                    <InputMask type='text' placeholder='Tipo de doação' className={styles.inputCadastro}></InputMask>

                                                                                </div>
                                                                                <Botao estilo='cadastrarConfirma'>Cadastra-se</Botao>
                                                                            </form>
                                                                        </div>
                                                                        <img className={styles.fotoCadastro} src={imagemCadastro} alt='imagemCadastro'></img>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            opcao === 10 ?
                                                                <>
                                                                    <div className={styles.conteudoCadastroUsuario}>
                                                                        <div className={styles.cadastroUsuario}>
                                                                            <div className={styles.formsCadastro}>
                                                                                <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                                                                                    <div className={styles.cadastroForms} style={{ margin: '1rem 0' }}>
                                                                                        Cadastro
                                                                                    </div>
                                                                                    <div className={styles.cadaInput}>
                                                                                        <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                                                                        <InputMask type='text' placeholder='Nome da empresa' className={styles.inputCadastro}></InputMask>
                                                                                    </div>
                                                                                    <div className={styles.cadaInput}>
                                                                                        <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                                                                        <InputMask mask='99.999.999/9999-99' type='text' placeholder='CNPJ' className={styles.inputCadastro}></InputMask>
                                                                                    </div>
                                                                                    <div className={styles.cadaInput}>
                                                                                        <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                                                                        <InputMask type='email' placeholder='Digite seu E-mail' className={styles.inputCadastro}></InputMask>
                                                                                    </div>
                                                                                    <div className={styles.cadaInput}>
                                                                                        <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                                                                        <InputMask type='password' placeholder='Digite sua Senha' className={styles.inputCadastro}></InputMask>
                                                                                    </div>
                                                                                    <div className={styles.cadaInput}>
                                                                                        <label className={styles.labelCadastro}><IoIosStarOutline className={styles.iconeCadastro} /></label>
                                                                                        <InputMask type='text' placeholder='Segmento de mercado' className={styles.inputCadastro}></InputMask>
                                                                                    </div>
                                                                                    <div className={styles.inputEndereco}>
                                                                                        <div className={styles.cadaInput}>
                                                                                            <label className={styles.labelCadastro}><PiHouseLight className={styles.iconeCadastro} /></label>
                                                                                            <Botao referencia={botaoEnderecoRef} onClick={enderecoVisivel} estilo='inputCadastro'>{placeEndereco}</Botao>
                                                                                        </div>
                                                                                        {
                                                                                            visivelEndereco &&
                                                                                            (
                                                                                                <div ref={campoEnderecoRef} className={styles.boxEndereco}>
                                                                                                    <div className={styles.maiorBoxEndereco}>
                                                                                                        <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                                        <div className={styles.inputMaiorBoxEndereco}>
                                                                                                            <InputMask
                                                                                                                maxLength="8"
                                                                                                                type="text"
                                                                                                                placeholder='CEP'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={cep}
                                                                                                                onChange={handleCepChange}
                                                                                                            />
                                                                                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                            <InputMask
                                                                                                                placeholder='Número'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={endereco.numero}
                                                                                                                name="numero"
                                                                                                                type="number"
                                                                                                                onChange={handleInputChange}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className={styles.maiorBoxEndereco}>
                                                                                                        <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                                        <div className={styles.inputMaiorBoxEndereco}>
                                                                                                            <InputMask
                                                                                                                placeholder='Rua'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={endereco.rua}
                                                                                                                name="rua"
                                                                                                                onChange={handleInputChange}
                                                                                                                type="text"
                                                                                                                readOnly={(temRua === true && endereco.cep !== '')}
                                                                                                            />
                                                                                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                            <InputMask
                                                                                                                placeholder='Complemento'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={endereco.complemento}
                                                                                                                name="complemento"
                                                                                                                onChange={handleInputChange}
                                                                                                                type="text"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className={styles.maiorBoxEndereco}>
                                                                                                        <BsArrowReturnRight className={styles.iconeBoxEndereco}> </BsArrowReturnRight>
                                                                                                        <div className={styles.inputMaiorBoxEndereco}>
                                                                                                            <InputMask
                                                                                                                placeholder='Cidade'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={endereco.cidade}
                                                                                                                name="cidade"
                                                                                                                readOnly
                                                                                                                type="text"
                                                                                                            />
                                                                                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                                                                            <InputMask
                                                                                                                placeholder='Bairro'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={endereco.bairro}
                                                                                                                name="bairro"
                                                                                                                type="text"
                                                                                                                onChange={handleInputChange}
                                                                                                                readOnly={(temBairro === true && endereco.cep !== '')}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className={styles.maiorBoxEndereco}>
                                                                                                        <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                                                                        <div className={styles.inputMaiorBoxEndereco}>
                                                                                                            <InputMask
                                                                                                                placeholder='Estado'
                                                                                                                className={styles.inputBoxEndereco}
                                                                                                                value={endereco.estado}
                                                                                                                name="estado"
                                                                                                                readOnly
                                                                                                                type="text"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                    <div className={styles.cadaInput} style={{ margin: '0 0 1rem 0' }}>
                                                                                        <label className={styles.labelCadastro}><IoCallOutline className={styles.iconeCadastro} /></label>
                                                                                        <InputMask mask='(99) 99999-9999' type='text' placeholder='telefone' className={styles.inputCadastro}></InputMask>
                                                                                    </div>
                                                                                    <Botao estilo='cadastrarConfirma'>Cadastra-se</Botao>
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

            {
                visivelLogin &&
                <div onClick={fecharBoxLogin} ref={escuroRef} className={styles.escuroTela}>
                    <div ref={boxLoginRef} className={styles.boxLogin}>
                        <div className={styles.x}>
                            <BsX className={styles.iconeFecharLogin} onClick={() => { setVisivelLogin(false); setTrocarSenha(1); }}></BsX>
                        </div>
                        <div className={styles.boxMenorLogin}>
                            <div className={styles.painel}>
                                <img className={styles.logoPainel} src={logo} alt='logo'></img>
                                <div className={styles.tituloPainel}>
                                    Faça seu login
                                </div>
                                <div className={styles.textoPainel}>
                                    Para ajudar ou solicitar ajuda, você precisa ter um cadastro
                                </div>
                            </div>
                            {
                                (trocarSenha === 1 || trocarSenha == 2) &&

                                <div className={styles.botoesPainel}>
                                    <div className={styles.botaoPainel}>
                                        <Botao estilo='bolinhaLogin' onClick={() => { setTipoUsuario(1) }}>
                                            <div className={`${styles.bolalogin1} ${tipoUsuario === 1 ? Cor['bolaEscura'] : Cor['bolaClara']}`}>

                                            </div>
                                        </Botao>
                                        <div className={styles.descricaoLogin}>
                                            Voluntário
                                        </div>
                                    </div>
                                    <div className={styles.botaoPainel}>
                                        <Botao estilo='bolinhaLogin' onClick={() => { setTipoUsuario(2) }}>
                                            <div className={`${styles.bolalogin2} ${tipoUsuario === 2 ? Cor['bolaEscura'] : Cor['bolaClara']}`}>

                                            </div>
                                        </Botao >
                                        <div className={styles.descricaoLogin}>
                                            Doador
                                        </div>
                                    </div>
                                    <div className={styles.botaoPainel}>
                                        <Botao estilo='bolinhaLogin' onClick={() => { setTipoUsuario(3) }}>
                                            <div className={`${styles.bolalogin3} ${tipoUsuario === 3 ? Cor['bolaEscura'] : Cor['bolaClara']}`}>

                                            </div>
                                        </Botao>
                                        <div className={styles.descricaoLogin}>
                                            Empresa
                                        </div>
                                    </div>
                                    <div className={styles.botaoPainel}>
                                        <Botao estilo='bolinhaLogin' onClick={() => { setTipoUsuario(4) }}>
                                            <div className={`${styles.bolalogin4} ${tipoUsuario === 4 ? Cor['bolaEscura'] : Cor['bolaClara']}`}>

                                            </div>
                                        </Botao>
                                        <div className={styles.descricaoLogin}>
                                            Beneficiário
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className={styles.inputsLogin}>
                                {
                                    trocarSenha === 1 ?
                                        <>
                                            <div className={styles.inputLogin}>
                                                <FiAtSign className={styles.iconeLogin} />
                                                <InputMask type='email' className={styles.inputL} placeholder='Digite seu email'></InputMask>
                                            </div>
                                            <div className={styles.inputLogin}>
                                                <GoLock className={styles.iconeLogin} />
                                                <InputMask type='password' className={styles.inputL} placeholder='Digite sua senha'></InputMask>
                                            </div>
                                            <div onClick={() => { setTrocarSenha(2) }} className={styles.esqueceuLogin}>
                                                Esqueceu sua senha?
                                            </div>
                                            <Botao estilo='confirmarLogin'>Entrar</Botao>
                                        </>
                                        :
                                        trocarSenha === 2 ?
                                            <>
                                                <div className={styles.inputLogin}>
                                                    <FiAtSign className={styles.iconeLogin} />
                                                    <InputMask type='email' className={styles.inputL} placeholder='Digite seu email'></InputMask>
                                                </div>
                                                <div onClick={() => { setTrocarSenha(3) }} className={styles.mandarEmail}>
                                                    Enviar código
                                                </div>
                                            </>
                                            :
                                            trocarSenha === 3 ?
                                                <>
                                                    <InputMask type='text' mask="9 - 9 - 9 - 9 - 9 - 9" className={styles.inputTrocarSenha} placeholder='0 0 0 0 0 0'></InputMask>
                                                    <div onClick={() => { setTrocarSenha(3) }} className={styles.mandarEmail}>
                                                        Reenviar código
                                                    </div>
                                                    <Botao onClick={() => { setTrocarSenha(1) }} estilo='confirmarLogin'>Confirmar código</Botao>
                                                </>
                                                :
                                                <>
                                                </>
                                }


                            </div>

                            <div className={styles.cadastrarLogin}>
                                Não possui um cadastro ainda?  <p className={styles.cadastroLogin} onClick={() => { setOpcao(6); setVisivelLogin(false) }}>Cadastre-se</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Home;