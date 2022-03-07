import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionMakingBox from '../Components/MakeGame/QuestionMakingBox';
import styles from './MakeGame.module.css';
import axios from 'axios';

function MakeGame() {
    // 🚨 state로 받아올 것 : uuid, name(host), questionNumber, index, answers, questions
    const navigate = useNavigate();

    /* 📌 useLocation 활용하여 state 받아오는 방법 참고 */
    const location = useLocation();
    const uuid = location.state.uuid;
    const name = location.state.name;
    const questionNumber = location.state.questionNumber;
    let index = location.state.index;
    let answers = location.state.answers;
    let questions = location.state.questions;
    /**************************************************/

    const [former, setFormer] = useState("송강 호되게 혼내기");
    const [latter, setLatter] = useState("송강호 되게 혼내기");
    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    function mapNumber() {
        const numbers = [];
        for (let i=1; i<=questionNumber; i++) {
            numbers.push(<QuestionNumber key={i} number={i} activated={i === index ? true : false} />)
        }
        return numbers;
    }

    function goPrev() {
        navigate(-1);
    }

    function goNext() {
        // flag 값은 전자를 선택한 경우 0, 후자를 선택한 경우 1
        let flag;
        if (formerSelected) { flag = 0; }
        else { flag = 1; }

        // 현재 문제에 대한 문제 및 응답 저장
        answers.push(flag);
        questions.push({
            firstOption: former,
            secondOption: latter
        });

        // session storage에 answers 값 업데이트
        let storedAnswers = JSON.parse(window.sessionStorage.getItem("answers"));
        if (storedAnswers !== null && storedAnswers.length >= index) { // 이미 응답한 문제일 경우
            storedAnswers[index-1] = flag; // 선택을 변경했을 수 있으므로 업데이트
            window.sessionStorage.setItem("answers", JSON.stringify(storedAnswers));
        }
        else { // 그 외
            window.sessionStorage.setItem("answers", JSON.stringify(answers));
        }

        // 마지막 문제까지 응답한 경우 POST 후 sessionStorage clear 및 sharelink 페이지로 이동
        // console.log("type check", typeof index, typeof questionNumber);
        if (index === parseInt(questionNumber)) {
            axios.post("http://localhost:80/api/balanceGame", {
                answers: answers,
                questions: questions,
                uuid: uuid
            })
            .then((response) => {
                console.log(response);
                window.sessionStorage.clear();
                navigate(
                    "/sharelink", {
                        state: {
                            uuid: uuid, 
                            name: name
                        }
                    }
                )
            })
            .catch((error) => {console.log(error)})
        }

        // 다음 문제가 있을 경우 makegame 컴포넌트 새로 렌더링
        navigate(
            "/makegame", {
            state: {
                uuid: uuid,
                name: name,
                questionNumber: questionNumber,
                index: index+1,
                answers: answers,
                questions: questions
            }
        })
    }

    useEffect(() => {
        // 이전 버튼 (뒤로 가기) 클릭 시 이전 선택 기록이 남아있을 수 있도록 session storage로 answers 따로 관리
        if (window.sessionStorage.getItem("answers") === null) {
            window.sessionStorage.setItem("answers", JSON.stringify([]));
        }

        let storedAnswers = JSON.parse(window.sessionStorage.getItem("answers"));
        if (storedAnswers !== null && storedAnswers.length >= index) { // 이미 응답한 문제일 경우
            if (storedAnswers[index-1] === 0) { // 전자를 선택한 경우
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
    }, [index])

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.makeGame}>
                <span className={styles.title}>{name}님만의 밸런스게임 만들기 ✍</span>

                <div className={styles.numberDiv}>
                    {mapNumber()}
                </div>

                <div className={styles.questionDiv}>
                    <a className={styles.skip} href="/MakeGame">이 문제 건너뛰기 👉</a> 
                    <QuestionMakingBox key={index} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text={former} setText={setFormer}/>
                    <span className={styles.versus}>VS</span>
                    <QuestionMakingBox key={index+10} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text={latter} setText={setLatter}/>
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