import styles from './QuestionBox.module.css';
import { useState, useRef, useLayoutEffect } from 'react';

function QuestionBox({isFormer, text}) {
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef(null);
    useLayoutEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    });

    const onClickEditMode = () => {
        setEditMode(!editMode);
    }

    return (
        <div className={`${styles.questionBox} ${isFormer ? styles.pinkBox : styles.blueBox}`}>
            {!editMode ?
            <div className={styles.wrapperBox}>
                <span className={isFormer ? styles.defaultPinkText : styles.defaultBlueText}>{text}</span>
                <span className={styles.editText} onClick={() => {setEditMode(!editMode)}}>선택지 수정하기 📝</span>
            </div>
            :
            <div className={styles.wrapperBox}>
                <textarea className={styles.inputBox} placeholder={text} ref={inputRef}></textarea>
                <span className={styles.editText} onClick={onClickEditMode}>수정 완료하기 ✅</span>
            </div>
            }
        </div>
    );
}

export default QuestionBox;