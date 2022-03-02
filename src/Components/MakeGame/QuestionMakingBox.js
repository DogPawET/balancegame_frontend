import styles from './QuestionMakingBox.module.css';
import { useState, useRef, useLayoutEffect } from 'react';

function QuestionMakingBox({isFormer, thisSelected, anotherSelected, setThisSelected, setAnotherSelected, text, setText}) {
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
        setText(e.target.value);
    }

    const confirmEdit = () => {
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