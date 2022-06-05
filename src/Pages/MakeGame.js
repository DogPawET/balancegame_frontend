import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionMakingBox from '../Components/MakeGame/QuestionMakingBox';
import styles from './MakeGame.module.css';
import { useRecoilState } from "recoil";
import { hostInfoState, indexState, hostGameState, makingOptsState, questionListState } from "../_recoil/state";

const MakeGame = () => {
    const navigate = useNavigate();
    // 🚨 state로 받아올 것 : uuid, name(host), questionCount, index, answers, questions
    const [hostInfo, setHostInfo] = useRecoilState(hostInfoState);
    const [index, setIndex] = useRecoilState(indexState);
    const [hostGame, setHostGame] = useRecoilState(hostGameState);
    const [makingOpts, setMakingOpts] = useRecoilState(makingOptsState);
    const [questionList, setQuestionList] = useRecoilState(questionListState);

    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    const mapNumber = () =>{
        const numbers = [];
        for (let i=1; i<=hostInfo.questionCount; i++) {
            numbers.push(<QuestionNumber key={i} number={i} activated={i === index ? true : false} />)
        }
        return numbers;
    }

    const goPrev = () => {
        setIndex(index-1);
    }

    const goNext = () => {
        // flag 값은 전자를 선택한 경우 0, 후자를 선택한 경우 1
        let flag;
        if (formerSelected) { flag = 0; }
        else { flag = 1; }

        // 현재 문제에 대한 문제 및 응답 저장
        
        let updatedOpts = [...makingOpts];
        if (makingOpts !== null && makingOpts.length >= index) {
            updatedOpts[index-1] = flag;

            let tempAnswers = [...hostGame.answers];
            let tempQuestions = [...hostGame.questions];
            tempAnswers[index-1] = flag;
            tempQuestions[index-1] = {
                firstOption: questionList[index-1][0],
                secondOption: questionList[index-1][1],
            }
            setHostGame({
                answers: tempAnswers,
                questions: tempQuestions,
            });
        }
        else {
            updatedOpts.push(flag);
            setHostGame({
                answers: [
                    ...hostGame.answers,
                    flag,
                ],
                questions: [
                    ...hostGame.questions,
                    {
                        firstOption: questionList[index-1][0],
                        secondOption: questionList[index-1][1],
                    }
                ]
            });
        }
        setMakingOpts(updatedOpts);
        console.log(hostGame);

        // 마지막 문제까지 응답한 경우 POST 후 sessionStorage clear 및 sharelink 페이지로 이동
        // console.log("type check", typeof index, typeof questionNumber);
        if (index === parseInt(hostInfo.questionCount)) {
            navigate("/sharelink"); // setIndex(1);
        }

        // 다음 문제가 있을 경우 makegame 컴포넌트 새로 렌더링
        setIndex(index+1);
    }

    useEffect(() => {
        if (makingOpts !== null && makingOpts.length >= index) { // 이미 응답한 문제일 경우
            if (makingOpts[index-1] === 0) { // 전자를 선택한 경우
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
    }, [index, makingOpts, questionList])

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.makeGame}>
                <span className={styles.title}>{hostInfo.name}님만의 밸런스게임 만들기 ✍</span>

                <div className={styles.numberDiv}>
                    {mapNumber()}
                </div>

                <div className={styles.questionDiv}>
                    <a className={styles.skip} href="/MakeGame">이 문제 건너뛰기 👉</a> 
                    <QuestionMakingBox key={index} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text={questionList[index-1][0]}/>
                    <span className={styles.versus}>VS</span>
                    <QuestionMakingBox key={index+10} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text={questionList[index-1][1]}/>
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