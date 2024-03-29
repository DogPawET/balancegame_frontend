import styles from '../../Styles/QuestionDoingBox.module.css';
import IQuestionBox from '../../Interfaces/IQuestionBox';

const QuestionDoingBox = ({ isFormer, thisSelected, anotherSelected, setThisSelected, setAnotherSelected, text }: IQuestionBox) => {
    const onClickSelect = () => {
        if (anotherSelected) {
            setAnotherSelected(!anotherSelected);
        }
        setThisSelected(!thisSelected);
    }
    
    return (
        <div className={`${styles.questionBox} ${isFormer ? styles.pinkBox : styles.blueBox}`}>
            <div className={styles.wrapperBox}>
                <span className={`${styles.defaultBox} ${styles.mainText}
                ${isFormer && !thisSelected && styles.pinkNoSelected}
                ${isFormer && thisSelected && styles.pinkYesSelected}
                ${!isFormer && !thisSelected && styles.blueNoSelected}
                ${!isFormer && thisSelected && styles.blueYesSelected}`}
                onClick={onClickSelect}>
                    {text}
                </span>
            </div>
        </div>

    );
}

export default QuestionDoingBox;