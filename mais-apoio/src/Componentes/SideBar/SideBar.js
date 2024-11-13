import { RxExit } from 'react-icons/rx';
import styles from './_sideBar.module.css';
import { Link } from 'react-router-dom';

const SideBar = ({ children }) => {
    return (
        <>
            <div className={styles.SideBar}>
                {children}
                <div className={styles.sair}>
                    <Link
                        className={styles.link}
                        to='../'>
                        <RxExit />
                        Sair
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SideBar;