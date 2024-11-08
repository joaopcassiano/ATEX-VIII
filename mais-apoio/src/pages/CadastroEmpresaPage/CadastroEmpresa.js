import styles from './_cadastroEmpresa.module.css'
import InputMask from 'react-input-mask';
import Botao from '../../Componentes/Botao/Botao';
import { useEffect, useState, useRef } from 'react';
import imagemCadastro from '../../assets/imagemCadastro.png';
import { BsPerson } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import { FiAtSign } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import { PiHouseLight } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import AcharCep from '../../Services/Endereco'
import { BsArrowReturnRight } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";

const CadastroEmpresa = () => {
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
    const [empresa, setEmpresa] = useState({
        nome: '',
        cnpj: '',
        telefone: '',
        segmentoDeMercado: '',
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
            setEmpresa({
                nome: '',
                cnpj: '',
                telefone: '',
                segmentoDeMercado: '',
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
        if (empresa.cep === '') {
            setPlaceEndereco('Endereço')
        }
        else if (empresa.bairro === '' || empresa.numero === '' || empresa.complemento === '' || empresa.rua === '' || empresa.cidade === '' || empresa.estado === '') {
            if (empresa.cep === undefined) {
                setPlaceEndereco('Endereço')
            }
            else {
                setPlaceEndereco('Preencha todos os dados')
            }

        } else if (empresa.bairro !== '' && empresa.numero !== '' && empresa.complemento !== '' && empresa.rua !== '' && empresa.cidade !== '' && empresa.estado !== '' && empresa.cep !== '') {

            setPlaceEndereco(empresa.rua + ' - ' + empresa.numero + ', ' + empresa.bairro + ', ' + empresa.cidade + '-' + empresa.estado)

        }
        else {
            setPlaceEndereco('Endereço')
        }
    }, [empresa])

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

                    setEmpresa({
                        nome: empresa.nome,
                        cnpj: empresa.cnpj,
                        telefone: empresa.telefone,
                        email: empresa.email,
                        senha: empresa.senha,
                        segmentoDeMercado: empresa.segmentoDeMercado,
                        rua: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        numero: '',
                        complemento: ''
                    });
                } else {
                    setEmpresa({
                        nome: empresa.nome,
                        cnpj: empresa.cnpj,
                        telefone: empresa.telefone,
                        segmentoDeMercado: empresa.segmentoDeMercado,
                        email: empresa.email,
                        senha: empresa.senha,
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
            setEmpresa({
                nome: empresa.nome,
                cnpj: empresa.cnpj,
                telefone: empresa.telefone,
                segmentoDeMercado: empresa.segmentoDeMercado,
                email: empresa.email,
                senha: empresa.senha,
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
        setEmpresa({ ...empresa, [name]: value });
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
                            <div className={styles.cadastroForms} style={{ margin: '1rem 0' }}>
                                Cadastro
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsPerson className={styles.iconeCadastro} /></label>
                                <InputMask
                                    type='text'
                                    placeholder='Nome da empresa'
                                    className={styles.inputCadastro}
                                    value={empresa.nome}
                                    onChange={(event) =>
                                        setEmpresa({ ...empresa, nome: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><BsPersonPlus className={styles.iconeCadastro} /></label>
                                <InputMask 
                                mask='99.999.999/9999-99' 
                                type='text' placeholder='CNPJ' 
                                className={styles.inputCadastro}
                                value={empresa.cnpj}
                                    onChange={(event) =>
                                        setEmpresa({ ...empresa, cnpj: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><FiAtSign className={styles.iconeCadastro} /></label>
                                <InputMask 
                                type='email' 
                                placeholder='Digite seu E-mail' 
                                className={styles.inputCadastro}
                                value={empresa.email}
                                    onChange={(event) =>
                                        setEmpresa({ ...empresa, email: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><GoLock className={styles.iconeCadastro} /></label>
                                <InputMask 
                                type='password' 
                                placeholder='Digite sua Senha' 
                                className={styles.inputCadastro}
                                value={empresa.senha}
                                    onChange={(event) =>
                                        setEmpresa({ ...empresa, senha: event.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.cadaInput}>
                                <label className={styles.labelCadastro}><IoIosStarOutline className={styles.iconeCadastro} /></label>
                                <InputMask 
                                type='text' 
                                placeholder='Segmento de mercado' 
                                className={styles.inputCadastro}
                                value={empresa.segmentoDeMercado}
                                    onChange={(event) =>
                                        setEmpresa({ ...empresa, segmentoDeMercado: event.target.value })
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
                                                        value={empresa.numero}
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
                                                        value={empresa.rua}
                                                        name="rua"
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        readOnly={existeRua && existeCep}
                                                    />
                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                    <InputMask
                                                        placeholder='Complemento'
                                                        className={styles.inputBoxEndereco}
                                                        value={empresa.complemento}
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
                                                        value={empresa.cidade}
                                                        name="cidade"
                                                        readOnly
                                                        type="text"
                                                    />
                                                    <BsArrowReturnRight className={styles.iconeMenorBoxEndereco}></BsArrowReturnRight>
                                                    <InputMask
                                                        placeholder='Bairro'
                                                        className={styles.inputBoxEndereco}
                                                        value={empresa.bairro}
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
                                                        value={empresa.estado}
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
                                <InputMask 
                                mask='(99) 99999-9999' 
                                type='text' 
                                placeholder='telefone' 
                                className={styles.inputCadastro}
                                value={empresa.telefone}
                                    onChange={(event) =>
                                        setEmpresa({ ...empresa, telefone: event.target.value })
                                    }
                                />
                            </div>
                            <Botao estilo='cadastrarConfirma'>Cadastra-se</Botao>
                        </form>
                    </div>
                    <img className={styles.fotoCadastro} src={imagemCadastro} alt='imagemCadastro'></img>
                </div>
            </div>
        </>
    )
}

export default CadastroEmpresa;