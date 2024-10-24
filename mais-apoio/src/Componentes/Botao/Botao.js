import styles from './_botao.module.css';

const Botao = ({ children, estilo , onClick, referencia}) => {

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
        cadastrarConfirma : styles.cadastrarConfirma,
        inputCadastro: styles.inputCadastro,
        boxAjuda: styles.boxAjuda,
        bolinhaLogin: styles.bolinhaLogin,
        confirmarLogin: styles.confirmarLogin
    }

    return (
        <>
            <button ref={referencia} onClick={onClick} className={`${Estilo[estilo]}`}>{children}</button>
        </>
    )
}

export default Botao;