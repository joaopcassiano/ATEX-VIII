import styles from './_conteudo.module.css';

const Conteudo = ({ children }) => {
    return (
        <>
            <div className={styles.conteudo}>
                {children}
            </div>
        </>
    )
}

export default Conteudo;