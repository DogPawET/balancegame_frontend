import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionMakingBox from '../Components/MakeGame/QuestionMakingBox';
import styles from './MakeGame.module.css';
import axios from 'axios';

function MakeGame() {
    const navigate = useNavigate();
    const location = useLocation();
    const uuid = location.state.uuid;
    const name = location.state.name;
    const questionNumber = location.state.questionNumber;
    var current = location.state.current;
    var answers = location.state.answers;
    var questions = location.state.questions;
    console.log(location.state);

    const [former, setFormer] = useState("송강 호되게 혼내기");
    const [latter, setLatter] = useState("송강호 되게 혼내기");
    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    function mapNumber() {
        const numbers = [];
        for (let i=1; i<=questionNumber; i++) {
            numbers.push(<QuestionNumber key={i} number={i} activated={i === current ? true : false} />)
        }
        return numbers;
    }

    function goPrev() {
        navigate(-1);
    }

    function goNext() {
        current = current + 1;

        if (formerSelected) { answers.push(0); }
        else { answers.push(1); }

        questions.push({
            firstOption: former,
            secondOption: latter
        });

        if (current > questionNumber) {
            axios.post("http://localhost:80/api/balanceGame", {
                answers: answers,
                questions: questions,
                uuid: uuid
            })
            .then((response) => {
                console.log(response);
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

        navigate(
            "/makegame", {
            state: {
                uuid: uuid,
                name: name,
                questionNumber: questionNumber,
                current: current,
                answers: answers,
                questions: questions
            }
        })
    }

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.makeGame}>
                <span className={styles.title}>{name}님만의 밸런스게임 만들기 ✍</span>

                <div className={styles.numberDiv}>
                    {mapNumber()}
                </div>

                <div className={styles.questionDiv}>
                    <a className={styles.skip} href="/MakeGame">이 문제 건너뛰기 👉</a> 
                    <QuestionMakingBox key={current} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text={former} setText={setFormer}/>
                    <span className={styles.versus}>VS</span>
                    <QuestionMakingBox key={current+10} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text={latter} setText={setLatter}/>
                </div>

                <div className={styles.buttonDiv}>
                    {current !== 1 ? <button className={`${styles.btn} ${styles.prevBtn}`} onClick={goPrev}>이전</button> : null}
                    <button className={`${styles.btn} ${styles.nextBtn}`} onClick={goNext}>다음</button>
                </div>
            </div>
        </Layout>
    );
}

export default MakeGame;