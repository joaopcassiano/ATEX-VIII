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
        editarConfirma : styles.editarConfirma,
        inputCadastro: styles.inputCadastro,
        boxAjuda: styles.boxAjuda,
        bolinhaLogin: styles.bolinhaLogin,
        confirmarLogin: styles.confirmarLogin,
        confirmarLoginEntrar: styles.confirmarLoginEntrar,
        editar_perfil: styles.editar_perfil,
        sideBar: styles.sideBar,
        pesquisar: styles.pesquisar,
        doar: styles.doar,
    }

    return (
        <>
            <button ref={referencia} onClick={onClick} className={`${Estilo[estilo]}`}>{children}</button>
        </>
    )
}

export default Botao;