import { useLocation } from 'react-router-dom';
import styles from './_consultaGeralEmpresa.module.css';
import { FiAtSign, FiNavigation2 } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import { useState } from 'react';

const ConsultaGeralEmpresa = () => {
    const location = useLocation();
    const [maior, setMaior] = useState(false);
    const empresa = location.state || {};

    return (
        <>
            <div className={styles.corpo}>
                <div className={styles.titulo_maior}>
                    Histórico da Empresa
                </div>

                {/* Última vaga preenchida */}
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.titulo}>
                            Última vaga preenchida:
                        </div>
                        <div className={styles.conteudo}>
                            <div className={styles.texto_adicional}>
                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.empregos[0]?.colaborador}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.empregos[0]?.emailColaborador}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <BsBuilding style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.empregos[0]?.cargo}</p>
                            </div>
                        </div>
                    </div>
                    <img src={empresa.empregos[0]?.fotoColaborador} alt="foto colaborador" className={styles.imagem}></img>
                </div>

                {/* Último setor contratado */}
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.titulo}>
                            Último setor contratado:
                        </div>
                        <div className={styles.conteudo}>
                            <div className={styles.texto_adicional}>
                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.setores[0]?.nome}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.setores[0]?.emailContato}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <BsBuilding style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.setores[0]?.descricao}</p>
                            </div>
                        </div>
                    </div>
                    <img src={empresa.setores[0]?.imagem} alt="imagem setor" className={styles.imagem}></img>
                </div>

                {/* Colaborador mais recente */}
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.titulo}>
                            Colaborador mais recente:
                        </div>
                        <div className={styles.conteudo}>
                            <div className={styles.texto_adicional}>
                                <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.colaboradores[0]?.nome}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <FiAtSign style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.colaboradores[0]?.email}</p>
                            </div>
                            <div className={styles.texto_adicional}>
                                <BsBuilding style={{ color: '#007BFF', fontSize: '1.3rem' }} />
                                <p className={styles.texto_add}>{empresa.colaboradores[0]?.cargo}</p>
                            </div>
                        </div>
                    </div>
                    <img src={empresa.colaboradores[0]?.foto} alt="foto colaborador" className={styles.imagem}></img>
                </div>
            </div>
        </>
    );
};

export default ConsultaGeralEmpresa;
