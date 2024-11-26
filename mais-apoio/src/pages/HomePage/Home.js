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

const Home = () => {
    const [visivelLogin, setVisivelLogin] = useState(false)
    const [opcao, setOpcao] = useState(1)
    const escuroRef = useRef(null);
    const boxLoginRef = useRef(null);
    const [tipoUsuario, setTipoUsuario] = useState(1);
    const [trocarSenha, setTrocarSenha] = useState(1);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const Cor = {
        bolaEscura: styles.bolaEscura,
        bolaClara: styles.bolaClara
    }
    
    const fecharBoxLogin = (event) => {
        if (boxLoginRef.current && !boxLoginRef.current.contains(event.target)) {
            setVisivelLogin(false);
            setTrocarSenha(1);
        }
    };

    const login = async () => {
        try {
            if (tipoUsuario === 1) {

            }
            else if (tipoUsuario === 2) {

            }
            else if (tipoUsuario === 3) {

            }
            else if (tipoUsuario === 4) {
                const response = await BeneficiarioService.Logar(email, senha)
                console.log(response)
                navigate('../beneficiario', { state: response.data })

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

                                            <Botao onClick={login} estilo='confirmarLogin'>Entrar</Botao>
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