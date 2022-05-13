import styles from './GradationButton.module.css';

const GradationButton = ({text, onClick}) => {
    return (
        <button className={styles.gradationBtn} onClick={onClick}>
            <span className={styles.btnText}>{text}</span>
        </button>
    );
}

export default GradationButton;