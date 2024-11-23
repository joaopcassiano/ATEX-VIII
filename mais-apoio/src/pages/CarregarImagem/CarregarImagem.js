import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "./_carregarImagem.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import BeneficiarioService from '../../Services/BeneficiarioService';

const CarregarImagem = (tipoUsuario, id) => {
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation()
    const [informacoesUsuario] = useState(location.state || { tipoUsuario: '', id: 0 })

    useEffect(() => {
        console.log(informacoesUsuario)
    }, [informacoesUsuario])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropAndUpload = async () => {
        const cropper = cropperRef.current?.cropper;

        if (cropper) {
            cropper.getCroppedCanvas().toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("file", blob, "cropped-file.png");

                try {
                    const response = await axios.post("http://localhost:5233/api/ImageUpload/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    if (response.status === 200) {
                        console.log("URL da imagem:", response.data.imageUrl);

                        console.log(informacoesUsuario.tipoUser)

                        if (informacoesUsuario.tipoUser === 'Beneficiario') {
                            try
                            {
                                const resposta = await BeneficiarioService.CarregarImagemo(response?.data?.imageUrl,informacoesUsuario.id)
                                console.log(resposta)
                            }
                            catch (error)
                            {
                                console.error("Erro ao carregar imagem:", error.message);
                            }
                            
                        }
                        else if (informacoesUsuario.tipoUsuario === 'Doador') {

                        }
                        else if (informacoesUsuario.tipoUsuario === 'Voluntario') {

                        }
                        else if (informacoesUsuario.tipoUsuario === 'Empresa') {

                        }

                    } else {
                        console.error("Erro ao fazer upload:", response.data.message);
                    }
                } catch (error) {
                    console.error("Erro:", error.response?.data?.message || error.message);
                }
            });
        }
    };

    return (
        <div className={styles.conteudo}>
            <p className={styles.titulo}>
                Adicione sua imagem de perfil
            </p>
            <div className={styles.imagens}>
                {(image ?
                    <Cropper
                        src={image}
                        className={styles.com_imagem}
                        aspectRatio={1}
                        viewMode={1}
                        guides={true}
                        cropBoxResizable={true}
                        ref={cropperRef}
                    />
                    :
                    <>
                    </>
                )}
            </div>
            <div className={styles.botoes}>


                <div className={styles.file_upload_container}>
                    <input type="file" id="file" className={styles.file_input} onChange={handleFileChange} />
                    <label for="file" className={styles.file_label}>
                        {
                            (image ?
                                <>
                                    Selecionar outra imagem
                                </>
                                :
                                <>
                                    Selecione uma imagem
                                </>
                            )
                        }
                    </label>
                </div>
                {
                    (
                        image ?
                            <button className={styles.botao} onClick={handleCropAndUpload}>Salvar</button>

                            :
                            <></>
                    )
                }

            </div>
        </div>
    );
};

export default CarregarImagem;
