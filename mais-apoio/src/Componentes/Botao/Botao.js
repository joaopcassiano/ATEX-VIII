import styles from './_botao.module.css';

const Botao = ({ children, estilo , onClick}) => {

    const Estilo = {
        funcionalidadeHome: styles.funcionalidadeHome,
        entrarHome: styles.entrarHome,
        cadastrarHome: styles.cadastrarHome,
        botaoAzulHome: styles.botaoAzulHome,
        botaoBrancoHome: styles.botaoBrancoHome,
        logoHome: styles.logoHome
    }
    return (
        <>
            <button onClick={onClick} className={`${Estilo[estilo]}`}>{children}</button>
        </>
    )
}

export default Botao;