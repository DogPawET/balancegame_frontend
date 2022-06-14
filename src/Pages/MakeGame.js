import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionMakingBox from '../Components/MakeGame/QuestionMakingBox';
import styles from '../Styles/MakeGame.module.css';
import { useSelector, useDispatch } from "react-redux";
import { setIndex, setAnswers, setQuestions } from "../reducer/host";
import QuestionList from '../QuestionList';

const MakeGame = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, questionCount, questions, answers, index} = useSelector((state) => state.host);

    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    const mapNumber = () =>{
        const numbers = [];
        for (let i=1; i<=questionCount; i++) {
            numbers.push(<QuestionNumber key={i} number={i} activated={i === index ? true : false} />)
        }
        return numbers;
    }

    const goPrev = () => {
        dispatch(setIndex(-1));
    }

    const goNext = async () => {
        // flag 값은 전자를 선택한 경우 0, 후자를 선택한 경우 1
        let flag;
        if (formerSelected) { flag = 0; }
        else { flag = 1; }

        // 현재 문제에 대한 응답 저장
        let updated = [...answers];
        if (answers !== null && answers.length >= index) {
            updated[index-1] = flag;
        }
        else {
            updated.push(flag);
        }
        console.log(updated);
        dispatch(setAnswers(updated));

        // 마지막 문제까지 응답한 경우 POST 후 sessionStorage clear 및 sharelink 페이지로 이동
        // console.log("type check", typeof index, typeof questionNumber);
        if (index === questionCount) {
            navigate("/share-link"); // setIndex(1);
        }

        // 다음 문제가 있을 경우 makegame 컴포넌트 새로 렌더링
        dispatch(setIndex(1));
    }

    const onSkip = () => {
        let updated = [...questions];
        while (1) {
            let isValid = true;
            let randomIdx = Math.floor(Math.random() * 45);
            let randomQuestion = QuestionList[randomIdx];
            questions.forEach((value, index) => {
                if (JSON.stringify(value) === JSON.stringify(randomQuestion)) {
                    isValid = false;
                }
            })
            if (isValid) {
                updated[index-1] = randomQuestion;
                break;
            }
        }
        dispatch(setQuestions(updated));
    }

    useEffect(() => {
        if (answers !== null && answers.length >= index) { // 이미 응답한 문제일 경우
            if (answers[index-1] === 0) { // 전자를 선택한 경우
                setFormerSelected(true);
                setLatterSelected(false);
            }
            else { // 후자를 선택한 경우
                setFormerSelected(false);
                setLatterSelected(true);
            }
        }

        else { // 아직 응답하지 않은 문제일 경우
            setFormerSelected(false);
            setLatterSelected(false);
        }
    }, [index, answers, questions])

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.makeGame}>
                <span className={styles.title}>{name}님만의 밸런스게임 만들기 ✍</span>

                <div className={styles.numberDiv}>
                    {mapNumber()}
                </div>

                <div className={styles.questionDiv}>
                    <p className={styles.skip} onClick={onSkip}>이 문제 건너뛰기 👉</p> 
                    <QuestionMakingBox key={index} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text={questions[index-1][0]}/>
                    <span className={styles.versus}>VS</span>
                    <QuestionMakingBox key={index+10} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text={questions[index-1][1]}/>
                </div>

                <div className={styles.buttonDiv}>
                    {index !== 1 ? <button className={`${styles.btn} ${styles.abledBtn}`} onClick={goPrev}>이전</button> : null}
                    {!formerSelected && !latterSelected
                    ? <button className={`${styles.btn} ${styles.disabledBtn}`} disabled>다음</button>
                    : <button className={`${styles.btn} ${styles.abledBtn}`} onClick={goNext}>다음</button>
                    }
                </div>
            </div>
        </Layout>
    );
}

export default MakeGame;