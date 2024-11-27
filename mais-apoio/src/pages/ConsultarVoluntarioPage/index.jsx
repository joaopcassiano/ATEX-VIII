import React, { useEffect, useState } from 'react';
import styles from './_consultaVoluntario.module.css';
import perfil1 from '../../assets/FotoVoluntario1.png';
import perfil2 from '../../assets/FotoVoluntario2.png';
import perfil3 from '../../assets/FotoVoluntario3.png';
import { FiSearch } from 'react-icons/fi';

const ConsultarHistorico = () => {
    const [filtro, setFiltro] = useState('Nome');
    const [busca, setBusca] = useState('');
    const [beneficiarios, setBeneficiarios] = useState([
        {
            nome: 'Maria José da Silva',
            email: 'maria.jose@gmail.com',
            perfil: perfil2,
            status: 'ATIVO',
        },
        {
            nome: 'Geraldo M. Nunes',
            email: 'geraldonunes@gmail.com',
            perfil: perfil1,
            status: 'INATIVO',
        },
        {
            nome: 'Gabriela P. Moraes',
            email: 'gabriela.moraes@gmail.com',
            perfil: perfil3,
            status: 'INATIVO',
        },
    ]);

    useEffect(() => {
        setBusca('');
    }, [filtro]);

    const beneficiariosFiltrados = beneficiarios.filter((beneficiario) => {
        if (filtro === 'Nome') {
            return beneficiario.nome.toLowerCase().includes(busca.toLowerCase());
        } else if (filtro === 'Email') {
            return beneficiario.email.toLowerCase().includes(busca.toLowerCase());
        } else if (filtro === 'Status') {
            return beneficiario.status.toLowerCase() === busca.toLowerCase();
        }        
        return true;
    });

    return (
        <div className={styles.corpo}>
            <div className={styles.filtro}>
                <label htmlFor="filtro">Filtrar beneficiários:</label>
                <div className={styles.filtroInputs}>
                    <select
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                        <option value="Nome">Nome</option>
                        <option value="Email">Email</option>
                        <option value="Status">Status</option>
                    </select>
                    {filtro === 'Status' ? (
                        <select
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    ) : (
                        <input
                            type="text"
                            placeholder="Digite para filtrar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    )}
                    <button className={styles.searchButton}>
                        <FiSearch />
                    </button>
                </div>
            </div>
            <div className={styles.colaboracoes}>
                <h2>Suas últimas colaborações:</h2>
                {beneficiariosFiltrados.map((beneficiario, index) => (
                    <div className={styles.beneficiarioCard} key={index}>
                        <div className={styles.beneficiarioInfo}>
                            <h3>Beneficiário</h3>
                            <p>
                                <span className={styles.icon}><FiSearch /></span>
                                {beneficiario.nome}
                            </p>
                            <p>@ {beneficiario.email}</p>
                        </div>
                        <div className={styles.status}>
                            <span
                                className={
                                    beneficiario.status === 'ATIVO'
                                        ? styles.ativo
                                        : styles.inativo
                                }
                            >
                                ● {beneficiario.status}
                            </span>
                            <img src={beneficiario.perfil} alt="Perfil" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsultarHistorico;
