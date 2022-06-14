import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionDoingBox from '../Components/DoGame/QuestionDoingBox';
import styles from '../Styles/DoGame.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setGuestIndex, setGuestAnswers } from "../reducer/guest";

 const DoGame = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { game, name, answers, index} = useSelector((state) => state.guest);

    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    const mapNumber = (count, index) => {
        const numbers = [];
        for (let i=1; i<=count; i++) {
            numbers.push(<QuestionNumber key={i} number={i} activated={i === index ? true : false} />)
        }
        return numbers;
    }

    const goPrev = () => {
        dispatch(setGuestIndex(-1));
    }

    const postGuest = async (updated) => {
        await axios.post("http://localhost:80/api/guest", {
            answers: updated,
            name: name,
            uuid: game.hostId,
        })
        .then((response) => {
            console.log(response);
            navigate("/result", {
                state: {
                    result: response.data,
                }
            })
        })
        .catch((error) => { console.log(error); })
    }

    const goNext = () => {
        // flag 값은 전자를 선택한 경우 0, 후자를 선택한 경우 1
        let flag;
        if (formerSelected) { flag = 0; }
        else { flag = 1; }

        let updated= [...answers];

        // 현재 문제에 대한 응답 저장
        if (answers !== null && answers.length >= index) { // 이미 응답한 문제일 경우
            updated[index-1] = flag;
        }
        else { // 처음 응답하는 문제일 경우
            updated.push(flag);
        }
        dispatch(setGuestAnswers(updated));

        // 마지막 문제까지 응답한 경우
        if (index === parseInt(game.questions.length)) {
            postGuest(updated);
        }

        // 다음 문제가 있을 경우 dogame 컴포넌트 새로 렌더링
        dispatch(setGuestIndex(1));
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
    }, [answers, index])

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.doGame}>
                <span className={styles.title}>{game.hostName}님과의 밸런스 지수 알아보기 🙄</span>

                <div className={styles.numberDiv}>
                    {mapNumber(game.questions.length, index)}
                </div>

                <div className={styles.questionDiv}>
                    <QuestionDoingBox key={0} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text={game.questions[index-1]?.firstOption}/>
                    <span className={styles.versus}>VS</span>
                    <QuestionDoingBox key={1} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text={game.questions[index-1]?.secondOption}/>
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

export default DoGame;