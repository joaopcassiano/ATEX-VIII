import styles from './_botao.module.css';

const Botao = ({ children, estilo , onClick}) => {

    const Estilo = {
        funcionalidadeHome: styles.funcionalidadeHome,
        entrarHome: styles.entrarHome,
        cadastrarHome: styles.cadastrarHome,
        botaoAzulHome: styles.botaoAzulHome,
        botaoBrancoHome: styles.botaoBrancoHome,
        logoHome: styles.logoHome,
        setaDireita: styles.setaDireita,
        setaEsquerda: styles.setaEsquerda,
        cadastrarAjudado : styles.cadastrarAjudado,
        imagemCadastro: styles.imagemCadastro,
        cadastrarConfirma : styles.cadastrarConfirma
    }

    return (
        <>
            <button onClick={onClick} className={`${Estilo[estilo]}`}>{children}</button>
        </>
    )
}

export default Botao;