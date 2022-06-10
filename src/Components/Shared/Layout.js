import Header from './Header';
import styles from '../../Styles/Layout.module.css'

const Layout = ({children, isHeaderOn}) => {
    return (
        <div className={styles.container}>
            { isHeaderOn ? <Header /> : null }
            <div className={styles.layout}>
                {children}
            </div>
        </div>
    );
}

export default Layout;