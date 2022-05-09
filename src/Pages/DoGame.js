import { useEffect, useState } from 'react';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionDoingBox from '../Components/DoGame/QuestionDoingBox';
import styles from './DoGame.module.css';
import { useRecoilState } from "recoil";
import { indexState, doingOptsState } from "../_recoil/state";

 const DoGame = () => {
    // 🚨 state로 받아올 것 : guestName 및 밸런스게임 질문 찾기 GET api의 responses (hostName, questions가 담긴 배열)
    const [index, setIndex] = useRecoilState(indexState);
    const [doingOpts, setDoingOpts] = useRecoilState(doingOptsState);

    const hostName = "정다은";
    const count = 10;

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
        setIndex(index-1);
    }

    const goNext = () => {
        // flag 값은 전자를 선택한 경우 0, 후자를 선택한 경우 1
        let flag;
        if (formerSelected) { flag = 0; }
        else { flag = 1; }

        let updatedOpts = [...doingOpts];
        console.log(doingOpts);

        // 현재 문제에 대한 응답 저장
        if (doingOpts !== null && doingOpts.length >= index) { // 이미 응답한 문제일 경우
            updatedOpts[index-1] = flag;
        }
        else { // 처음 응답하는 문제일 경우
            updatedOpts.push(flag);
        }
        setDoingOpts(updatedOpts);
        console.log(doingOpts);

        // 다음 문제가 있을 경우 dogame 컴포넌트 새로 렌더링
        setIndex(index+1);
    }

    useEffect(() => {
        if (doingOpts !== null && doingOpts.length >= index) { // 이미 응답한 문제일 경우
            if (doingOpts[index-1] === 0) { // 전자를 선택한 경우
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
    }, [doingOpts, index])

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.doGame}>
                <span className={styles.title}>{hostName}님과의 밸런스 지수 알아보기 🙄</span>

                <div className={styles.numberDiv}>
                    {mapNumber(count, index)}
                </div>

                <div className={styles.questionDiv}>
                    <QuestionDoingBox key={0} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text="송강 호되게 혼내기" />
                    <span className={styles.versus}>VS</span>
                    <QuestionDoingBox key={1} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text="송강호 되게 혼내기"/>
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