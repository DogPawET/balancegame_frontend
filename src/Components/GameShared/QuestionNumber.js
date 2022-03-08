import styles from './QuestionNumber.module.css';

const QuestionNumber = ({number, activated}) => {
    return (
        <div className={`${styles.questionNumber} ${activated ? styles.active : styles.inactive}`}>
            <div className={styles.number}>{number}</div>
        </div>
    );
}

export default QuestionNumber;