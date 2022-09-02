import styles from '../../Styles/QuestionNumber.module.css';

interface IQuestionNumber {
    number: number;
    activated: boolean;
}

const QuestionNumber = ({ number, activated }: IQuestionNumber) => {
    return (
        <div className={`${styles.questionNumber} ${activated ? styles.active : styles.inactive}`}>
            <div className={styles.number}>{number}</div>
        </div>
    );
}

export default QuestionNumber;