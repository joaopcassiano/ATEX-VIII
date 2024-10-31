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
    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: '',
        cep: ''
    });
    const [beneficiario, setBeneficiario] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        situacaoEconomica: '',
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
            setEndereco({
                rua: '',
                bairro: '',
                cidade: '',
                estado: '',
                numero: '',
                complemento: '',
                cep: ''
            });
            setBeneficiario({
                nome: '',
                cpf: '',
                telefone: '',
                dataNascimento: '',
                situacaoEconomica: '',
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

        } else if (endereco.bairro !== '' && endereco.numero !== '' && endereco.complemento !== '' && endereco.rua !== '' && endereco.cidade !== '' && endereco.estado !== '' && endereco.cep !== '') {

            setPlaceEndereco(endereco.rua + ' - ' + endereco.numero + ', ' + endereco.bairro + ', ' + endereco.cidade + '-' + endereco.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [endereco])

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

                    setEndereco({
                        rua: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        numero: '',
                        complemento: ''
                    });

                    setBeneficiario({
                        nome: beneficiario.nome,
                        cpf: beneficiario.cpf,
                        telefone: beneficiario.telefone,
                        dataNascimento: beneficiario.dataNascimento,
                        situacaoEconomica: beneficiario.situacaoEconomica,
                        email: beneficiario.email,
                        senha: beneficiario.senha,
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

                    setBeneficiario({
                        nome: beneficiario.nome,
                        cpf: beneficiario.cpf,
                        telefone: beneficiario.telefone,
                        dataNascimento: beneficiario.dataNascimento,
                        situacaoEconomica: beneficiario.situacaoEconomica,
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

            setBeneficiario({
                nome: beneficiario.nome,
                cpf: beneficiario.cpf,
                telefone: beneficiario.telefone,
                dataNascimento: beneficiario.dataNascimento,
                situacaoEconomica: beneficiario.situacaoEconomica,
                email: beneficiario.email,
                senha: beneficiario.senha,
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
        setEndereco({ ...endereco, [name]: value });
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


    return (
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
                                                        readOnly={existeRua && existeCep}
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
                                <InputMask
                                    mask='(99) 99999-9999'
                                    type='text'
                                    placeholder='telefone'
                                    value={beneficiario.telefone}
                                    onChange={(event) =>
                                        setBeneficiario({ ...beneficiario, telefone: event.target.value })
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
                            <Botao onClick={async () => { await BeneficiarioService.Criar(beneficiario) }} estilo='cadastrarConfirma'>Cadastra-se</Botao>
                        </form>
                    </div>
                    <img className={styles.fotoCadastro} src={imagemCadastro} alt='imagemCadastro'></img>
                </div>
            </div>
        </>
    )
}

export default CadastroBeneficiario;