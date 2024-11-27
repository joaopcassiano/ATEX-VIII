import React from 'react';
import Conteudo from '../../Componentes/Conteudo/Conteudo';
import styles from './_voluntario.module.css';
import { FiNavigation2 } from 'react-icons/fi';

const Voluntariar = () => {

    const beneficiarios = [
        {
            nome: 'Geraldo M. Silva',
            perfil: 'https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png',
            desafios: ['Vulnerabilidade social', 'Renda baixa'],
        },
        {
            nome: 'Larissa D. Monteiro',
            perfil: 'https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png',
            desafios: ['Sem residência fixa', 'Desemprego'],
        },
        {
            nome: 'Gabriela P. Moraes',
            perfil: 'https://raw.githubusercontent.com/AndersonCaproni/FotosPerfil/main/images/990265ca-9b83-4306-a0c1-3c27daa9e525_27/11/2024%2015%3A03%3A51_59208-perfil.png',
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
