import logo from '../../Sources/logo.png';
import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles[`left-tab`]}>
                <img className={styles.logo} src={logo} alt="logo"/>
                <span className={styles.title}>너와 나의 밸런스 지수 test</span>
            </div>
            <div className={styles[`right-tab`]}>
                <span className={styles.developer}> Made by DogPaw2</span>
            </div>
        </div>
    );
}

export default Header;