import styles from './_cadastroVoluntario.module.css';
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
import { FaNetworkWired } from "react-icons/fa";

const CadastroVoluntario = () => {
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
    const [imageWidth, setImageWidth] = useState(0);
    const [voluntario, setVoluntario] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        areaDeAtuacao: '',
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
            setVoluntario({
                nome: '',
                cpf: '',
                telefone: '',
                dataNascimento: '',
                areaDeAtuacao: '',
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
        if (voluntario.cep === '') {
            setPlaceEndereco('Endereço')
        }
        else if (voluntario.bairro === '' || voluntario.numero === '' || voluntario.complemento === '' || voluntario.rua === '' || voluntario.cidade === '' || voluntario.estado === '') {
            if (voluntario.cep === undefined) {
                setPlaceEndereco('Endereço')
            }
            else {
                setPlaceEndereco('Preencha todos os dados')
            }

        } else if (voluntario.bairro !== '' && voluntario.numero !== '' && voluntario.complemento !== '' && voluntario.rua !== '' && voluntario.cidade !== '' && voluntario.estado !== '' && voluntario.cep !== '') {

            setPlaceEndereco(voluntario.rua + ' - ' + voluntario.numero + ', ' + voluntario.bairro + ', ' + voluntario.cidade + '-' + voluntario.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [voluntario])

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

                    setVoluntario({
                        nome: voluntario.nome,
                        cpf: voluntario.cpf,
                        telefone: voluntario.telefone,
                        dataNascimento: voluntario.dataNascimento,
                        email: voluntario.email,
                        senha: voluntario.senha,
                        areaDeAtuacao: voluntario.areaDeAtuacao,
                        rua: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        numero: '',
                        complemento: ''
                    });
                } else {
                    setVoluntario({
                        nome: voluntario.nome,
                        cpf: voluntario.cpf,
                        telefone: voluntario.telefone,
                        dataNascimento: voluntario.dataNascimento,
                        areaDeAtuacao: voluntario.areaDeAtuacao,
                        email: voluntario.email,
                        senha: voluntario.senha,
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
            setVoluntario({
                nome: voluntario.nome,
                cpf: voluntario.cpf,
                telefone: voluntario.telefone,
                dataNascimento: voluntario.dataNascimento,
                areaDeAtuacao: voluntario.areaDeAtuacao,
                email: voluntario.email,
                senha: voluntario.senha,
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
        setVoluntario({ ...voluntario, [name]: value });
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

    return (
        <>
            <div className={styles.conteudoCadastroUsuario}>
                <div className={styles.cadastroUsuario}>
                <div style={{marginRight: imageWidth? `calc(${imageWidth}px - ${(imageWidth * 0.6) / 100}%)`: '0'}} className={styles.formsCadastro}>
                        <form className={styles.formularioCadastro} onSubmit={(event) => event.preventDefault()}>
                            <div className={styles.cadastroForms}>
                                Cadastro
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='text'
                                    placeholder='Nome Completo'
                                    className={styles.inputCadastro}
                                    value={voluntario.nome}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, nome: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                <InputMask
                                    mask='999.999.999-99'
                                    type='text'
                                    placeholder='CPF'
                                    className={styles.inputCadastro}
                                    value={voluntario.cpf}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, cpf: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='email'
                                    placeholder='Digite seu E-mail'
                                    className={styles.inputCadastro}
                                    value={voluntario.email}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, email: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='password'
                                    placeholder='Digite sua Senha'
                                    className={styles.inputCadastro}
                                    value={voluntario.senha}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, senha: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><CiCalendar className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='date'
                                    placeholder='Data de Nascimento'
                                    className={styles.inputCadastro}
                                    value={voluntario.dataNascimento}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, dataNascimento: event.target.value })
                                    }
                                />
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
                                                        value={voluntario.numero}
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
                                                        value={voluntario.rua}
                                                        name="rua"
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        readOnly={existeRua && existeCep}
                                                    />
                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                    <InputMask
                                                        placeholder='Complemento'
                                                        className={styles.inputBoxEndereco}
                                                        value={voluntario.complemento}
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
                                                        value={voluntario.cidade}
                                                        name="cidade"
                                                        readOnly
                                                        type="text"
                                                    />
                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                    <InputMask
                                                        placeholder='Bairro'
                                                        className={styles.inputBoxEndereco}
                                                        value={voluntario.bairro}
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
                                                        value={voluntario.estado}
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
                                    className={styles.inputCadastro}
                                    value={voluntario.telefone}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, telefone: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><FaNetworkWired className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='text'
                                    placeholder='Área de atuação'
                                    className={styles.inputCadastro}
                                    value={voluntario.areaDeAtuacao}
                                    onChange={(event) =>
                                        setVoluntario({ ...voluntario, areaDeAtuacao: event.target.value })
                                    }
                                />
                            </div>
                            <Botao estilo='cadastrarConfirma'>Cadastra-se</Botao>
                        </form>
                    </div>
                    <img className={styles.fotoCadastro} onLoad={handleImageLoad} src={imagemCadastro} alt='imagemCadastro'></img>
                </div>
            </div>
        </>
    )
}

export default CadastroVoluntario;