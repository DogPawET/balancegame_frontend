import React from "react";
import styles from '../../Styles/QuestionMakingBox.module.css';
import { useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../reducer/host";
import IQuestionBox from '../../Interfaces/IQuestionBox';
import { IRootState } from '../../reducer';
import IQuestion from "../../Interfaces/IQuestion";
import IHostInfo from "../../Interfaces/IHostInfo";

const QuestionMakingBox = ({ isFormer, thisSelected, anotherSelected, setThisSelected, setAnotherSelected, text }: IQuestionBox) => {
    const { index, questions }: IHostInfo = useSelector((state: IRootState) => state.host);
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

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

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const confirmEdit = () => {
        if (value) {
            let updated: IQuestion[]  = [...questions];
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
                <textarea maxLength={50} className={`${styles.inputBox} ${styles.mainText}`} placeholder={text} ref={inputRef} onChange={onChange}></textarea>
                <span className={styles.editText} onClick={confirmEdit}>수정 완료하기 ✅</span>
            </div>
            }
        </div>
    );
}

export default QuestionMakingBox;