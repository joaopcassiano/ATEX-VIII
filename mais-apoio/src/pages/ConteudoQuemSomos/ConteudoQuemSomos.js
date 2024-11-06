import styles from './_conteudoQuemSomos.module.css';

const ConteudoQuemSomos = () => {
    return (
        <>
            <div className={styles.textoBannerSobreApoio}>
                <p className={styles.tituloTextoBannerSobreApoio}>
                    Sobre o +APOIO
                </p>
                <p className={styles.textoTextoBannerSobreApoio}>
                    O Sistema +Apoio foi idealizado por um grupo de estudantes do 4º período de Ciências da Computação, que compartilharam a visão de criar uma plataforma capaz de fazer a diferença na vida de pessoas em situação de vulnerabilidade. Com a missão de conectar esses indivíduos a oportunidades essenciais, nossa iniciativa se baseia na solidariedade e na colaboração, promovendo um impacto positivo em nossas comunidades.
                </p>
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>
                    <div className={styles.tituloText}>
                        <div className={styles.tituloText1}>
                            QUEM
                        </div>
                        <div className={styles.tituloText2}>
                            SOMOS?
                        </div>
                    </div>
                    <div className={styles.textoText}>
                        O Sistema +Apoio é uma plataforma que conecta pessoas em situação de vulnerabilidade a oportunidades essenciais, promovendo solidariedade e colaboração.
                    </div>
                </div>
                <div className={styles.text}>
                    <div className={styles.tituloText}>
                        <div className={styles.tituloText1}>
                            O QUE
                        </div>
                        <div className={styles.tituloText2}>
                            FAZEMOS?
                        </div>
                    </div>
                    <div className={styles.textoText}>
                        No Sistema +Apoio, conectamos beneficiários, doadores e voluntários. Oferecemos a chance de fazer doações a projetos sociais, ser voluntário em organizações e ajudar pessoas vulneráveis a encontrar empregos.
                    </div>
                </div>
                <div className={styles.text}>
                    <div className={styles.tituloText}>
                        <div className={styles.tituloText1}>
                            COMO
                        </div>
                        <div className={styles.tituloText2}>
                            ME INSCREVO?
                        </div>
                    </div>
                    <div className={styles.textoText}>
                        Para se inscrever, acesse nossa plataforma e crie uma conta, escolhendo entre doador, voluntário ou beneficiário. Depois, explore as oportunidades e ajude a transformar vidas.
                    </div>
                </div>
            </div>
            <div className={styles.descricaoSobre}>
                Junte-se a nós! Cada ação conta. Seja você um doador, voluntário ou alguém em busca de oportunidades, sua participação é fundamental para transformar realidades.
            </div>
        </>
    );
}

export default ConteudoQuemSomos;