import styles from './_corpoInferior.module.css';

const CorpoInferior = ({ children }) => {
return (
    <div className={styles.corpo_inferior}>
        {children}
    </div>
)
}

export default CorpoInferior;