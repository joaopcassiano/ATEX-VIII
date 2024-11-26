import Botao from '../../Componentes/Botao/Botao';
import logo from '../../assets/logo.png';
import styles from './_home.module.css';
import TopBar from '../../Componentes/TopBar/TopBar';
import { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { FiAtSign } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { BsX } from "react-icons/bs";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BeneficiarioService from '../../Services/BeneficiarioService'
import { ToastContainer, toast } from "react-toastify";
import CodigoValidacaoUsuarioService from '../../Services/CodigoValidacaoUsuarioService';

const Home = () => {
    const [visivelLogin, setVisivelLogin] = useState(false)
    const [opcao, setOpcao] = useState(1)
    const escuroRef = useRef(null);
    const boxLoginRef = useRef(null);
    const [tipoUsuario, setTipoUsuario] = useState(1);
    const [trocarSenha, setTrocarSenha] = useState(1);
    const [email, setEmail] = useState('');
    const [emailTrocar, setEmailTrocar] = useState('');
    const [codigo, setCodigo] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [id, setId] = useState(0);
    const navigate = useNavigate();

    const Cor = {
        bolaEscura: styles.bolaEscura,
        bolaClara: styles.bolaClara
    }

    const fecharBoxLogin = (event) => {
        if (boxLoginRef.current && !boxLoginRef.current.contains(event.target)) {
            setVisivelLogin(false);
            setTrocarSenha(1);
            setEmailTrocar('');
            setCodigo('');
            setSenha('');
            setConfirmarSenha('');
            setId(0)
        }
    };

    const login = async () => {
        try {
            if (tipoUsuario === 1) {

            }
            else if (tipoUsuario === 2) {
                navigate('../doador')
            }
            else if (tipoUsuario === 3) {

            }
            else if (tipoUsuario === 4) {
                const response = await BeneficiarioService.Logar(email, senha)
                console.log(response)
                navigate('../beneficiario', { state: response.data })

            } else {
                toast.error("Tipo de usuário inválido!", {
                    position: "top-center",
                    autoClose: 2500
                });
            }
        }
        catch (error) {
            console.error(error)
            toast.error(`Erro ao logar: ${error.response.data}!`, {
                position: "top-center",
                autoClose: 3000
            });
        }

    }

    const CriarCodigo = async () => {
        try {
            const resposta = await CodigoValidacaoUsuarioService.CriarCodigo(emailTrocar, tipoUsuario);
            console.log(resposta);
            setTrocarSenha(3);
            toast.success(`${resposta.data}!`, {
                position: "top-center",
                autoClose: 2500
            });
        }
        catch (error) {
            console.log('Erro ao gerar código:', error);
            toast.error(`Erro ao gerar o código: ${error.response?.data}!`, {
                position: "top-center",
                autoClose: 2500
            });
        }
    }

    const ValidarCodigo = async () => {
        try {
            const resposta = await CodigoValidacaoUsuarioService.ValidarCodigo(codigo, emailTrocar, tipoUsuario);
            console.log(resposta);
            setId(resposta.data);
            setTrocarSenha(4);
            toast.success("Código válido com sucesso, troque sua senha!", {
                position: "top-center",
                autoClose: 2500
            });
        }
        catch (error) {
            console.log('Erro ao validar código:', error);
            toast.error(`Erro ao validar o código: ${error.response?.data}!`, {
                position: "top-center",
                autoClose: 2500
            });
        }
    }

    const TrocaDeSenha = async () => {
        try {
            if (tipoUsuario === 1) {

            }
            else if (tipoUsuario === 2) {
                
            }
            else if (tipoUsuario === 3) {

            }
            else if (tipoUsuario === 4) {
                try {
                    const response = await BeneficiarioService.TrocarSenha(id, senha, confirmarSenha)
                    console.log(response);
                    toast.success("Senha trocada com sucesso, você será redirecionado!", {
                        position: "top-center",
                        autoClose: 3000
                    });
                    setTimeout(() => {
                        navigate('../beneficiario', { state: id })
                    }, 4000);
                }
                catch (error) {
                    console.error(error);
                    toast.error(`${error.response?.data}!`, {
                        position: "top-center",
                        autoClose: 2500
                    });
                    return;
                }
            } else {
                toast.error("Tipo de usuário inválido!", {
                    position: "top-center",
                    autoClose: 2500
                });
            }
        }
        catch (error) {
            console.log('Erro ao trocar senha:', error);
            toast.error(`Erro ao trocar a senha: ${error.response?.data}!`, {
                position: "top-center",
                autoClose: 2500
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <div className={styles.corpo}>
                <TopBar valorLogin={(a) => { setVisivelLogin(a); setTrocarSenha(1); }} />
                <div className={styles.conteudo}>
                    <Outlet />
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
                                (trocarSenha === 1 || trocarSenha === 2) &&

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
                                                <InputMask
                                                    type='email'
                                                    className={styles.inputL}
                                                    placeholder='Digite seu email'
                                                    value={email}
                                                    onChange={(event) =>
                                                        setEmail(event.target.value)
                                                    }
                                                ></InputMask>
                                            </div>
                                            <div className={styles.esqueceuESenha}>
                                                <div className={styles.inputLogin}>
                                                    <GoLock className={styles.iconeLogin} />
                                                    <InputMask
                                                        type='password'
                                                        className={styles.inputL}
                                                        placeholder='Digite sua senha'
                                                        value={senha}
                                                        onChange={(event) =>
                                                            setSenha(event.target.value)
                                                        }
                                                    ></InputMask>
                                                </div>
                                                <div onClick={() => { setTrocarSenha(2) }} className={styles.esqueceuLogin}>
                                                    Esqueceu sua senha?
                                                </div>
                                            </div>

                                            <Botao onClick={login} estilo='confirmarLogin'>Entrar</Botao>
                                        </>
                                        :
                                        trocarSenha === 2 ?
                                            <>
                                                <div className={styles.inputLogin}>
                                                    <FiAtSign className={styles.iconeLogin} />
                                                    <InputMask
                                                        type='email'
                                                        className={styles.inputL}
                                                        placeholder='Digite seu email'
                                                        value={emailTrocar}
                                                        onChange={(event) =>
                                                            setEmailTrocar(event.target.value)
                                                        }></InputMask>
                                                </div>
                                                <div onClick={() => { CriarCodigo() }} className={styles.mandarEmail}>
                                                    Enviar código
                                                </div>
                                            </>
                                            :
                                            trocarSenha === 3 ?
                                                <>
                                                    <InputMask
                                                        type='text'
                                                        mask="9 - 9 - 9 - 9 - 9 - 9"
                                                        className={styles.inputTrocarSenha}
                                                        placeholder='0 0 0 0 0 0'
                                                        value={codigo}
                                                        onChange={(event) =>
                                                            setCodigo(event.target.value)
                                                        }
                                                    ></InputMask>

                                                    <div onClick={() => { CriarCodigo() }} className={styles.mandarEmail}>
                                                        Reenviar código
                                                    </div>
                                                    <Botao onClick={() => { ValidarCodigo() }} estilo='confirmarLogin'>Confirmar código</Botao>
                                                </>
                                                :
                                                trocarSenha === 4 ?
                                                    <>
                                                        <div className={styles.inputLogin}>
                                                            <GoLock className={styles.iconeLogin} />
                                                            <InputMask
                                                                type='password'
                                                                className={styles.inputL}
                                                                placeholder='Digite sua nova senha'
                                                                value={senha}
                                                                onChange={(event) =>
                                                                    setSenha(event.target.value)
                                                                }
                                                            ></InputMask>
                                                        </div>
                                                        <div className={styles.inputLogin}>
                                                            <GoLock className={styles.iconeLogin} />
                                                            <InputMask
                                                                type='password'
                                                                className={styles.inputL}
                                                                placeholder='Confirme sua nova senha'
                                                                value={confirmarSenha}
                                                                onChange={(event) =>
                                                                    setConfirmarSenha(event.target.value)
                                                                }
                                                            ></InputMask>
                                                        </div>
                                                        <Botao onClick={() => { TrocaDeSenha() }} estilo='confirmarLoginEntrar'>Confirmar e entrar</Botao>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                }


                            </div>

                            <div className={styles.cadastrarLogin}>
                                <p>Não possui um cadastro ainda?</p>  <p className={styles.cadastroLogin} onClick={() => { setVisivelLogin(false); navigate('todos-cadastros') }}>Cadastre-se</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Home;