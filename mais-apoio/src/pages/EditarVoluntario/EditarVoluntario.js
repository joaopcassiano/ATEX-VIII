import styles from './_editarVoluntario.module.css';
import { LuDollarSign } from "react-icons/lu";
import { NumericFormat } from 'react-number-format';
// import BeneficiarioService from '../../Services/BeneficiarioService';
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

const EditarVoluntario = ({ usuario }) => {
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
    const [voluntario, setVoluntario] = useState(usuario);
    const [voluntarioTrocar, setVoluntarioTrocar] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
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
            console.log(voluntario)
            setVoluntarioTrocar({
                nome: '',
                cpf: '',
                telefone: '',
                dataNascimento: '',
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
        if (voluntarioTrocar.cep === '') {
            setPlaceEndereco('Endereço')
        }
        else if (voluntarioTrocar.bairro === '' || voluntarioTrocar.numero === '' || voluntarioTrocar.complemento === '' || voluntarioTrocar.rua === '' || voluntarioTrocar.cidade === '' || voluntarioTrocar.estado === '') {
            if (voluntarioTrocar.cep === undefined) {
                setPlaceEndereco('Endereço')
            }
            else {
                setPlaceEndereco('Preencha todos os dados')
            }

        } else if (voluntarioTrocar.bairro !== '' && voluntarioTrocar.numero !== '' && voluntarioTrocar.complemento !== '' && voluntarioTrocar.rua !== '' && voluntarioTrocar.cidade !== '' && voluntarioTrocar.estado !== '' && voluntarioTrocar.cep !== '') {

            setPlaceEndereco(voluntarioTrocar.rua + ' - ' + voluntarioTrocar.numero + ', ' + voluntarioTrocar.bairro + ', ' + voluntarioTrocar.cidade + '-' + voluntarioTrocar.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [voluntarioTrocar])

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
                    setVoluntarioTrocar({
                        nome: voluntarioTrocar.nome,
                        cpf: voluntarioTrocar.cpf,
                        telefone: voluntarioTrocar.telefone,
                        dataNascimento: voluntarioTrocar.dataNascimento,
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
                    setVoluntarioTrocar({
                        nome: voluntarioTrocar.nome,
                        cpf: voluntarioTrocar.cpf,
                        telefone: voluntarioTrocar.telefone,
                        dataNascimento: voluntarioTrocar.dataNascimento,
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
            setVoluntarioTrocar({
                nome: voluntarioTrocar.nome,
                cpf: voluntarioTrocar.cpf,
                telefone: voluntarioTrocar.telefone,
                dataNascimento: voluntarioTrocar.dataNascimento,
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
        setVoluntarioTrocar({ ...voluntarioTrocar, [name]: value });
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

    // const Cadastrar = async () => {
    //     try {
    //         const resposta = await BeneficiarioService.Criar(voluntarioTrocar);
    //         toast.success("Cadastro realizado com sucesso, faça o login!", {
    //             position: "top-center",
    //             autoClose: 3000
    //         });

    //         setTimeout(() => {
    //             navigate('../apresentacao');
    //         }, 4000);
    //     }
    //     catch (error) {
    //         console.log(error)
    //         toast.error(
    //             `Erro ao cadastrar o beneficiário: ${error.response.data}`,
    //             {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //             }
    //         );
    //     }

    // }


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
                            value={voluntarioTrocar.nome}
                            onChange={(event) =>
                                setVoluntarioTrocar({ ...voluntarioTrocar, nome: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <div className={styles.cadaInput}>
                        <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                        <InputMask
                            mask='999.999.999-99'
                            type='text'
                            placeholder='CPF'
                            value={voluntarioTrocar.cpf}
                            onChange={(event) =>
                                setVoluntarioTrocar({ ...voluntarioTrocar, cpf: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <div className={styles.cadaInput}>
                        <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                        <InputMask
                            placeholder='Data de Nascimento'
                            type='date'
                            value={voluntarioTrocar.dataNascimento}
                            onChange={(event) =>
                                setVoluntarioTrocar({ ...voluntarioTrocar, dataNascimento: event.target.value })
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
                                                value={voluntarioTrocar.numero}
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
                                                value={voluntarioTrocar.rua}
                                                name="rua"
                                                onChange={handleInputChange}
                                                type="text"
                                                readOnly={existeRua && existeCep}
                                            />
                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                            <InputMask
                                                placeholder='Complemento'
                                                className={styles.inputBoxEndereco}
                                                value={voluntarioTrocar.complemento}
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
                                                value={voluntarioTrocar.cidade}
                                                name="cidade"
                                                readOnly
                                                type="text"
                                            />
                                            <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                            <InputMask
                                                placeholder='Bairro'
                                                className={styles.inputBoxEndereco}
                                                value={voluntarioTrocar.bairro}
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
                                                value={voluntarioTrocar.estado}
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
                            value={voluntarioTrocar.telefone}
                            onChange={(event) =>
                                setVoluntarioTrocar({ ...voluntarioTrocar, telefone: event.target.value })
                            }
                            className={styles.inputCadastro} />
                    </div>
                    <Botao estilo='editarConfirma'>Editar</Botao>
                </form>
            </div>
        </>
    )
}

export default EditarVoluntario;