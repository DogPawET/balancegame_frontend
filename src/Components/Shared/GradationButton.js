import styles from '../../Styles/GradationButton.module.css';

const GradationButton = ({text, onClick}) => {
    return (
        <button className={styles.gradationBtn} onClick={onClick}>
            <span>{text}</span>
        </button>
    );
}

export default GradationButton;