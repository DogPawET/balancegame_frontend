import styles from './QuestionMakingBox.module.css';
import { useState, useRef, useLayoutEffect } from 'react';
import { useRecoilState } from "recoil";
import { indexState, questionListState } from "../../_recoil/state";

const QuestionMakingBox = ({isFormer, thisSelected, anotherSelected, setThisSelected, setAnotherSelected, text}) => {
    const [index, setIndex] = useRecoilState(indexState);
    const [questionList, setQuestionList] = useRecoilState(questionListState);

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
            let questions = [...questionList];
            let question = {...questions[index-1]};
            isFormer ? question[0] = value : question[1] = value;
            questions.splice(index-1, 1, question);
            console.log(questions);
            setQuestionList(questions);
        }
        

        setEditMode(!editMode);
    }

    return (
        <div className={`${styles.questionBox} ${isFormer ? styles.pinkBox : styles.blueBox}`}>
            {!editMode ?
            <div className={styles.wrapperBox}>
                <span className={`${styles.defaultBox}
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
                <textarea className={styles.inputBox} placeholder={text} ref={inputRef} onChange={onChange}></textarea>
                <span className={styles.editText} onClick={confirmEdit}>수정 완료하기 ✅</span>
            </div>
            }
        </div>
    );
}

export default QuestionMakingBox;