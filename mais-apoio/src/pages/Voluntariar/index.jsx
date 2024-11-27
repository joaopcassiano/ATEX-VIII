import React from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import styles from './_voluntario.module.css';
import perfil1 from '../../assets/FotoVoluntario1.png';
import perfil2 from '../../assets/FotoVoluntario2.png';
import perfil3 from '../../assets/FotoVoluntario3.png';
import { FiNavigation2 } from 'react-icons/fi';

const Voluntariar = () => {

    const beneficiarios = [
        {
            nome: 'Geraldo M. Silva',
            perfil: perfil1,
            desafios: ['Vulnerabilidade social', 'Renda baixa'],
        },
        {
            nome: 'Larissa D. Monteiro',
            perfil: perfil2,
            desafios: ['Sem residência fixa', 'Desemprego'],
        },
        {
            nome: 'Gabriela P. Moraes',
            perfil: perfil3,
            desafios: ['Responsabilidade familiar', 'Região geográfica'],
        },
    ];

    return (
        <div className={styles.corpo}>
            <Conteudo>
                <h1 className={styles.titulo}>Escolha uma pessoa para doar.</h1>
                <div className={styles.cartoes}>
                    {beneficiarios.map((beneficiario, index) => (
                        <div key={index} className={styles.cartao}>
                            <img
                                src={beneficiario.perfil}
                                alt={`Foto de ${beneficiario.nome}`}
                                className={styles.imagemPerfil}
                            />
                            <div className={styles.info}>
                                <h2 className={styles.nome}>{beneficiario.nome}</h2>
                                {beneficiario.desafios.map((desafio, i) => (
                                    <p key={i} className={styles.desafio}>
                                        <FiNavigation2
                                        style={{
                                            transform: "rotate(90deg)",
                                            color: "#007BFF",
                                            fontSize: "0.9rem",
                                        }}
                                    /> {desafio}
                                    </p>
                                ))}
                                <button className={styles.voluntariarSe}>
                                    Voluntariar-se
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Conteudo>
        </div>
    );
};

export default Voluntariar;
