import styles from './_cadastroBeneficiario.module.css';
import { LuDollarSign } from "react-icons/lu";
import { NumericFormat } from 'react-number-format';
import BeneficiarioService from '../../Services/BeneficiarioService';
import InputMask from 'react-input-mask';
import Botao from '../../Componentes/Botao/Botao';
import { useEffect, useState, useRef } from 'react';
import imagemCadastro from '../../assets/imagemCadastro.png';
import { BsPerson } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import { FiAtSign } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { PiHouseLight } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import AcharCep from '../../Services/Endereco'
import { BsArrowReturnRight } from "react-icons/bs";
import { BsBucket } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CadastroBeneficiario = () => {
    const [visivelEndereco, setVisivelEndereco] = useState(false)
    const campoEnderecoRef = useRef(null);
    const botaoEnderecoRef = useRef(null);
    const [cep, setCep] = useState('');
    var temRua = false;
    var temBairro = false;
    var temCep = false;
    const [existeCep, setExisteCep] = useState(false);
    const [existeRua, setExisteRua] = useState(false);
    const [existeBairro, setExisteBairro] = useState(false);
    const [placeEndereco, setPlaceEndereco] = useState('Endereço');
    const navigate = useNavigate();
    const [imageWidth, setImageWidth] = useState(0);
    const [beneficiario, setBeneficiario] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        situacaoEconomica: '',
        necessidade: '',
        email: '',
        senha: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: '',
        cep: ''
    })

    useEffect(() => {
        {
            setBeneficiario({
                nome: '',
                cpf: '',
                telefone: '',
                dataNascimento: '',
                situacaoEconomica: '',
                necessidade: '',
                email: '',
                senha: '',
                rua: '',
                bairro: '',
                numero: '',
                complemento: '',
                cidade: '',
                estado: '',
                cep: ''
            });
        }
    }, [])

    useEffect(() => {
        if (beneficiario.cep === '') {
            setPlaceEndereco('Endereço')
        }
        else if (beneficiario.bairro === '' || beneficiario.numero === '' || beneficiario.complemento === '' || beneficiario.rua === '' || beneficiario.cidade === '' || beneficiario.estado === '') {
            if (beneficiario.cep === undefined) {
                setPlaceEndereco('Endereço')
            }
            else {
                setPlaceEndereco('Preencha todos os dados')
            }

        } else if (beneficiario.bairro !== '' && beneficiario.numero !== '' && beneficiario.complemento !== '' && beneficiario.rua !== '' && beneficiario.cidade !== '' && beneficiario.estado !== '' && beneficiario.cep !== '') {

            setPlaceEndereco(beneficiario.rua + ' - ' + beneficiario.numero + ', ' + beneficiario.bairro + ', ' + beneficiario.cidade + '-' + beneficiario.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [beneficiario])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickFora);

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    const handleCepChange = async (e) => {
        const cepDigitado = e.target.value.replace(/\D/g, '');
        setCep(cepDigitado);
        if (cepDigitado.length === 8) {
            try {
                const response = await AcharCep(cepDigitado)
                if (response.data.erro) {

                    temRua = false;
                    temBairro = false;
                    temCep = false;
                    setExisteCep(temCep);
                    setExisteRua(temRua);
                    setExisteBairro(temBairro);

                    setBeneficiario({
                        nome: beneficiario.nome,
                        cpf: beneficiario.cpf,
                        telefone: beneficiario.telefone,
                        dataNascimento: beneficiario.dataNascimento,
                        situacaoEconomica: beneficiario.situacaoEconomica,
                        email: beneficiario.email,
                        senha: beneficiario.senha,
                        necessidade: beneficiario.necessidade,
                        rua: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        numero: '',
                        complemento: ''
                    });
                } else {
                    setBeneficiario({
                        nome: beneficiario.nome,
                        cpf: beneficiario.cpf,
                        telefone: beneficiario.telefone,
                        dataNascimento: beneficiario.dataNascimento,
                        situacaoEconomica: beneficiario.situacaoEconomica,
                        necessidade: beneficiario.necessidade,
                        email: beneficiario.email,
                        senha: beneficiario.senha,
                        rua: response.data.logradouro || '',
                        bairro: response.data.bairro || '',
                        cidade: response.data.localidade || '',
                        estado: response.data.uf,
                        numero: '',
                        complemento: '',
                        cep: cepDigitado
                    });

                    const rua = response.data.logradouro || '';
                    const bairro = response.data.bairro || '';
                    const cep = cepDigitado || '';

                    if (rua !== '') {
                        temRua = true;
                    }
                    else if (rua === '') {
                        temRua = false;
                    }

                    if (bairro !== '') {
                        temBairro = true;
                    }
                    else if (bairro === '') {
                        temBairro = false;
                    }
                    temCep = true;
                    setExisteCep(temCep);
                    setExisteRua(temRua);
                    setExisteBairro(temBairro);
                }
            } catch (error) {
                temRua = false;
                temBairro = false;
                temCep = false;
                setExisteCep(temCep);
                setExisteRua(temRua);
                setExisteBairro(temBairro);
                console.error('Erro na consulta do CEP:', error);
            }
        } else {
            setBeneficiario({
                nome: beneficiario.nome,
                cpf: beneficiario.cpf,
                telefone: beneficiario.telefone,
                dataNascimento: beneficiario.dataNascimento,
                situacaoEconomica: beneficiario.situacaoEconomica,
                email: beneficiario.email,
                senha: beneficiario.senha,
                necessidade: beneficiario.necessidade,
                rua: '',
                bairro: '',
                cidade: '',
                estado: '',
                numero: '',
                complemento: ''
            });

            temRua = false;
            temBairro = false;
            temCep = false;
            setExisteCep(temCep);
            setExisteRua(temRua);
            setExisteBairro(temBairro);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBeneficiario({ ...beneficiario, [name]: value });
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

    const handleImageLoad = (event) => {
        const width = event.target.width;
        setImageWidth(width);
    };

    useEffect(() => {
        if (imageWidth > 0) {
            console.log(`Largura da imagem: ${imageWidth}px`);
        }
    }, [imageWidth]);


    const Cadastrar = async () => {
        try {
            const resposta = await BeneficiarioService.Criar(beneficiario);
            toast.success("Cadastro realizado com sucesso, faça o login!", {
                position: "top-center",
                autoClose: 3000
            });
            
            setTimeout(() => {
                navigate('../apresentacao');
            }, 4000);
        }
        catch (error) {
            console.log(error)
            toast.error(
                `Erro ao cadastrar o beneficiário: ${error.response.data}`,
                {
                    position: "top-center",
                    autoClose: 3000,
                }
            );
        }

    }

    return (
        <>
            <ToastContainer />
            <div className={styles.conteudoCadastroUsuario}>
                <div className={styles.cadastroUsuario}>
                    <div style={{ marginRight: imageWidth ? `calc(${imageWidth}px - ${(imageWidth * 0.6) / 100}%)` : '0' }} className={styles.formsCadastro}>
                        <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                            <div className={styles.cadastroForms}>
                                Cadastro
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='text'
                                    placeholder='Nome Completo'
                                    value={beneficiario.nome}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, nome: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                <InputMask
                                    mask='999.999.999-99'
                                    type='text'
                                    placeholder='CPF'
                                    value={beneficiario.cpf}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, cpf: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='email'
                                    placeholder='Digite seu E-mail'
                                    value={beneficiario.email}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, email: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='password'
                                    placeholder='Digite sua Senha'
                                    value={beneficiario.senha}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, senha: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                                <InputMask
                                    placeholder='Data de Nascimento'
                                    type='date'
                                    value={beneficiario.dataNascimento}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, dataNascimento: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
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
                                                        value={beneficiario.numero}
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
                                                        value={beneficiario.rua}
                                                        name="rua"
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        readOnly={existeRua && existeCep}
                                                    />
                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                    <InputMask
                                                        placeholder='Complemento'
                                                        className={styles.inputBoxEndereco}
                                                        value={beneficiario.complemento}
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
                                                        value={beneficiario.cidade}
                                                        name="cidade"
                                                        readOnly
                                                        type="text"
                                                    />
                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                    <InputMask
                                                        placeholder='Bairro'
                                                        className={styles.inputBoxEndereco}
                                                        value={beneficiario.bairro}
                                                        name="bairro"
                                                        type="text"
                                                        onChange={handleInputChange}
                                                        readOnly={existeBairro && existeCep}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.maiorBoxEndereco}>
                                                <BsArrowReturnRight className={styles.iconeBoxEndereco}></BsArrowReturnRight>
                                                <div className={styles.inputMaiorBoxEndereco}>
                                                    <InputMask
                                                        placeholder='Estado'
                                                        className={styles.inputBoxEndereco}
                                                        value={beneficiario.estado}
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
                                <InputMask
                                    mask='(99) 99999-9999'
                                    type='text'
                                    placeholder='Telefone'
                                    value={beneficiario.telefone}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, telefone: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsBucket className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='text'
                                    placeholder='Necessidade'
                                    value={beneficiario.necessidade}
                                    maxLength={30}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, necessidade: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><LuDollarSign className={styles.iconeCadastro} /></label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    placeholder='Situação econômica'
                                    value={beneficiario.situacaoEconomica}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, situacaoEconomica: event.target.value })
                                    }
                                    className={styles.inputCadastro} />
                            </div>
                            <Botao onClick={Cadastrar} estilo='cadastrarConfirma'>Cadastra-se</Botao>
                        </form>
                    </div>
                    <img className={styles.fotoCadastro} onLoad={handleImageLoad} src={imagemCadastro} alt='imagemCadastro'></img>
                </div>
            </div>
        </>
    )
}

export default CadastroBeneficiario;