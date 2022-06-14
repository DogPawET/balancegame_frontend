import styles from '../../Styles/QuestionMakingBox.module.css';
import { useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../reducer/host";

const QuestionMakingBox = ({isFormer, thisSelected, anotherSelected, setThisSelected, setAnotherSelected, text}) => {
    const { index, questions } = useSelector((state) => state.host);
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef(null);

    useLayoutEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    });

    const onClickSelect = () => {
        if (anotherSelected) {
            setAnotherSelected(!anotherSelected);
        }
        setThisSelected(!thisSelected);
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const confirmEdit = () => {
        if (value) {
            let updated = [...questions];
            let question = {...updated[index-1]};
            isFormer ? question["firstOption"] = value : question["secondOption"] = value;
            updated.splice(index-1, 1, question);
            dispatch(setQuestions(updated));
        }
        

        setEditMode(!editMode);
    }

    return (
        <div className={`${styles.questionBox} ${isFormer ? styles.pinkBox : styles.blueBox}`}>
            {!editMode ?
            <div className={styles.wrapperBox}>
                <span className={`${styles.defaultBox} ${styles.mainText}
                ${isFormer && !thisSelected && styles.pinkNoSelected}
                ${isFormer && thisSelected && styles.pinkYesSelected}
                ${!isFormer && !thisSelected && styles.blueNoSelected}
                ${!isFormer && thisSelected && styles.blueYesSelected}`}
                onClick={onClickSelect}>
                    {text}
                </span>
                <span className={styles.editText} onClick={() => {setEditMode(!editMode)}}>선택지 수정하기 📝</span>
            </div>
            :
            <div className={styles.wrapperBox}>
                <textarea maxLength="50" className={`${styles.inputBox} ${styles.mainText}`} placeholder={text} ref={inputRef} onChange={onChange}></textarea>
                <span className={styles.editText} onClick={confirmEdit}>수정 완료하기 ✅</span>
            </div>
            }
        </div>
    );
}

export default QuestionMakingBox;