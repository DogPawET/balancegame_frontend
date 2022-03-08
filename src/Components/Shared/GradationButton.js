import styles from './GradationButton.module.css';

const GradationButton = ({text}) => {
    return (
        <button className={styles.gradationBtn}>
            <span className={styles.btnText}>{text}</span>
        </button>
    );
}

export default GradationButton;