import logo from '../../Sources/logo.png';
import dogpaw from '../../Sources/dogpaw.png'
import styles from '../../Styles/Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles[`left-tab`]}>
                <img className={styles.image} src={logo} alt="Balance Game Logo"/>
                <span className={styles.text}>너와 나의 밸런스 지수 test</span>
            </div>
            <div className={styles[`right-tab`]}>
                <span className={styles.text}> Made by DogPaw2</span>
                <img className={styles.image} src={dogpaw} alt="Dogpaw Logo"></img>
            </div>
        </div>
    );
}

export default Header;