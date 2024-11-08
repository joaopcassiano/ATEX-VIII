import styles from './_conteudoAreaBeneficiario.module.css';
import fotoAjudado from '../../assets/fotoAjudado.png';
import { FiNavigation2 } from 'react-icons/fi';
import Botao from '../../Componentes/Botao/Botao';
import { Link } from 'react-router-dom';


const ConteudoAreaBeneficiario = () => {
    return (
        <>
            <div className={styles.ajudado}>
                <img className={styles.fotoAjudado} src={fotoAjudado} alt='fotoAjuda'></img>
                <div className={styles.blocoAjudado}>
                    <div className={styles.tituloAjudado}>Transformando Vidas</div>
                    <div className={styles.subtituloAjudado}>O Sistema +Apoio está aqui para oferecer suporte a quem mais precisa. Para ser elegível aos nossos programas, verifique se você se enquadra nas seguintes condições:</div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div className={styles.textoTextoAjudado}>
                            Renda Mensal: Sua renda familiar deve ser inferior a 1,5 salário mínimo.
                        </div>
                    </div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div >
                            Desemprego: Se você está desempregado há mais de 6 meses.
                        </div>
                    </div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div className={styles.textoTextoAjudado}>
                            Responsabilidade Familiar: Ter 3 ou mais dependentes.
                        </div>
                    </div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div className={styles.textoTextoAjudado}>
                            Moradia: Pessoas em situação de moradia precária ou sem moradia fixa são elegíveis.
                        </div>
                    </div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div className={styles.textoTextoAjudado}>
                            Vulnerabilidade Social: Pessoas cadastradas em programas de assistência governamental ou classificadas como vulneráveis pelo CRAS têm prioridade.
                        </div>
                    </div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div className={styles.textoTextoAjudado}>
                            Saúde: Indivíduos com problemas de saúde que impactam sua capacidade de trabalho, ou cuidadores de pessoas com doenças crônicas.
                        </div>
                    </div>
                    <div className={styles.textoAjudado}>
                        <div className={styles.iconeTextoAjudado}>
                            <FiNavigation2 style={{ transform: 'rotate(90deg)', color: '#007BFF', fontSize: '1.3rem' }} />
                        </div>
                        <div className={styles.textoTextoAjudado}>
                            Região Geográfica: Moradores de áreas rurais ou comunidades de baixa renda.
                        </div>
                    </div>
                    <div className={styles.descricaoAjudado}>Se você se enquadra em algum desses requisitos,  cadastre-se como beneficiário:</div>
                    <div className={styles.botaoAjudado}>
                        <Link to='../cadastro-beneficiario' className={styles.link}>
                            <Botao estilo='cadastrarAjudado'>Quero me cadastrar como beneficiário</Botao>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConteudoAreaBeneficiario;