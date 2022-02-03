import Layout from '../Components/Shared/Layout';
import styles from './Example.module.css';

function Example() {
    return (
        <Layout isHeaderOn={true}>
            <div className={styles.example}>
                <h1>밸런스게임</h1>
                <div className={styles.optionA}></div>
                <div className={styles.optionB}></div>
            </div>
        </Layout>
    );
}

export default Example;