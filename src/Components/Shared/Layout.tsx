import Header from './Header';
import styles from '../../Styles/Layout.module.css'

interface ILayout {
    children: React.ReactNode;
    isHeaderOn: boolean;
}

const Layout = ({ children, isHeaderOn }: ILayout) => {
    return (
        <>
        { isHeaderOn ? <Header /> : null }
        <div className={styles.container}>
            <div className={styles.layout}>
                {children}
            </div>
        </div>
        </>
    );
}

export default Layout;