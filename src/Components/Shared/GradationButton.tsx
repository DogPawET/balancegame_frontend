import styles from '../../Styles/GradationButton.module.css';

interface IGradationButton {
    text: string;
    onClick?: () => void;
}

const GradationButton = ({ text, onClick }: IGradationButton) => {
    return (
        <button className={styles.gradationBtn} onClick={onClick}>
            <span>{text}</span>
        </button>
    );
}

export default GradationButton;