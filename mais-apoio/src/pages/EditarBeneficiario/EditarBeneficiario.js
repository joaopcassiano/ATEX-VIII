import styles from './_editarBeneficiario.module.css';
import { LuDollarSign } from "react-icons/lu";
import { NumericFormat } from 'react-number-format';
import BeneficiarioService from '../../Services/BeneficiarioService';
import InputMask from 'react-input-mask';
import Botao from '../../Componentes/Botao/Botao';
import { useEffect, useState, useRef } from 'react';
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

const EditarBeneficiario = ({ usuario }) => {
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
    const [beneficiario, setBeneficiario] = useState(usuario);
    const [beneficiarioTrocar, setBeneficiarioTrocar] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        situacaoEconomica: '',
        necessidade: '',
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
            console.log(beneficiario)
            setBeneficiarioTrocar({
                nome: '',
                cpf: '',
                telefone: '',
                dataNascimento: '',
                situacaoEconomica: '',
                necessidade: '',
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
        if (beneficiarioTrocar.cep === '') {
            setPlaceEndereco('Endereço')
        }
        else if (beneficiarioTrocar.bairro === '' || beneficiarioTrocar.numero === '' || beneficiarioTrocar.complemento === '' || beneficiarioTrocar.rua === '' || beneficiarioTrocar.cidade === '' || beneficiarioTrocar.estado === '') {
            if (beneficiarioTrocar.cep === undefined) {
                setPlaceEndereco('Endereço')
            }
            else {
                setPlaceEndereco('Preencha todos os dados')
            }

        } else if (beneficiarioTrocar.bairro !== '' && beneficiarioTrocar.numero !== '' && beneficiarioTrocar.complemento !== '' && beneficiarioTrocar.rua !== '' && beneficiarioTrocar.cidade !== '' && beneficiarioTrocar.estado !== '' && beneficiarioTrocar.cep !== '') {

            setPlaceEndereco(beneficiarioTrocar.rua + ' - ' + beneficiarioTrocar.numero + ', ' + beneficiarioTrocar.bairro + ', ' + beneficiarioTrocar.cidade + '-' + beneficiarioTrocar.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [beneficiarioTrocar])

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
                    console.log(response)
                    setBeneficiarioTrocar({
                        nome: beneficiarioTrocar.nome,
                        cpf: beneficiarioTrocar.cpf,
                        telefone: beneficiarioTrocar.telefone,
                        dataNascimento: beneficiarioTrocar.dataNascimento,
                        situacaoEconomica: beneficiarioTrocar.situacaoEconomica,
                        necessidade: beneficiarioTrocar.necessidade,
                        rua: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        numero: '',
                        complemento: ''
                    });
                    toast.error(
                        `Erro na consulta do CEP: CEP não encontrado!`,
                        {
                            position: "top-center",
                            autoClose: 2000,
                        }
                    );
                } else {
                    setBeneficiarioTrocar({
                        nome: beneficiarioTrocar.nome,
                        cpf: beneficiarioTrocar.cpf,
                        telefone: beneficiarioTrocar.telefone,
                        dataNascimento: beneficiarioTrocar.dataNascimento,
                        situacaoEconomica: beneficiarioTrocar.situacaoEconomica,
                        necessidade: beneficiarioTrocar.necessidade,
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
                    toast.success(
                        `CEP encontrado`,
                        {
                            position: "top-center",
                            autoClose: 2000,
                        }
                    );
                }
            } catch (error) {
                temRua = false;
                temBairro = false;
                temCep = false;
                setExisteCep(temCep);
                setExisteRua(temRua);
                setExisteBairro(temBairro);
                console.error('Erro na consulta do CEP:', error);
                toast.error(
                    `Erro na consulta do CEP: ${error.response.data}`,
                    {
                        position: "top-center",
                        autoClose: 2000,
                    }
                );
            }
        } else {
            setBeneficiarioTrocar({
                nome: beneficiarioTrocar.nome,
                cpf: beneficiarioTrocar.cpf,
                telefone: beneficiarioTrocar.telefone,
                dataNascimento: beneficiarioTrocar.dataNascimento,
                situacaoEconomica: beneficiarioTrocar.situacaoEconomica,
                necessidade: beneficiarioTrocar.necessidade,
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
        setBeneficiarioTrocar({ ...beneficiarioTrocar, [name]: value });
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

    const Cadastrar = async () => {
        try {
            const resposta = await BeneficiarioService.Criar(beneficiarioTrocar);
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
            <div className={styles.cadastroUsuario}>
                <div className={styles.cadastroForms}>
                    Editar perfil
                </div>
                <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                    <div className={styles.cadaInput}>
                        <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                        <InputMask
                            type='text'
                            placeholder='Nome Completo'
                            value={beneficiarioTrocar.nome}
                            onChange={(event) =>
                                setBeneficiarioTrocar({ ...beneficiarioTrocar, nome: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <div className={styles.cadaInput}>
                        <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                        <InputMask
                            mask='999.999.999-99'
                            type='text'
                            placeholder='CPF'
                            value={beneficiarioTrocar.cpf}
                            onChange={(event) =>
                                setBeneficiarioTrocar({ ...beneficiarioTrocar, cpf: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <div className={styles.cadaInput}>
                        <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                        <InputMask
                            placeholder='Data de Nascimento'
                            type='date'
                            value={beneficiarioTrocar.dataNascimento}
                            onChange={(event) =>
                                setBeneficiarioTrocar({ ...beneficiarioTrocar, dataNascimento: event.target.value })
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
                                                value={beneficiarioTrocar.numero}
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
                                                value={beneficiarioTrocar.rua}
                                                name="rua"
                                                onChange={handleInputChange}
                                                type="text"
                                                readOnly={existeRua && existeCep}
                                            />
                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                            <InputMask
                                                placeholder='Complemento'
                                                className={styles.inputBoxEndereco}
                                                value={beneficiarioTrocar.complemento}
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
                                                value={beneficiarioTrocar.cidade}
                                                name="cidade"
                                                readOnly
                                                type="text"
                                            />
                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                            <InputMask
                                                placeholder='Bairro'
                                                className={styles.inputBoxEndereco}
                                                value={beneficiarioTrocar.bairro}
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
                                                value={beneficiarioTrocar.estado}
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
                            value={beneficiarioTrocar.telefone}
                            onChange={(event) =>
                                setBeneficiarioTrocar({ ...beneficiarioTrocar, telefone: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <div className={styles.cadaInput}>
                        <label className={styles.labelCadastro}><BsBucket className={styles.iconeCadastro} /></label>
                        <InputMask
                            type='text'
                            placeholder='Necessidade'
                            value={beneficiarioTrocar.necessidade}
                            maxLength={30}
                            onChange={(event) =>
                                setBeneficiarioTrocar({ ...beneficiarioTrocar, necessidade: event.target.value })
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
                            value={beneficiarioTrocar.situacaoEconomica}
                            onChange={(event) =>
                                setBeneficiarioTrocar({ ...beneficiarioTrocar, situacaoEconomica: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <Botao onClick={Cadastrar} estilo='editarConfirma'>Editar</Botao>
                </form>
            </div>
        </>
    )
}

export default EditarBeneficiario;