import { useState } from 'react';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/GameShared/QuestionNumber';
import QuestionDoingBox from '../Components/DoGame/QuestionDoingBox';
import styles from './DoGame.module.css';

function DoGame() {
    const hostName = "정다은";
    const count = 10;
    const current = 1;
    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    function mapNumber(count, current) {
        const numbers = [];
        for (let i=1; i<=count; i++) {
            numbers.push(<QuestionNumber key={i} number={i} activated={i === current ? true : false} />)
        }
        return numbers;
    }

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.doGame}>
                <span className={styles.title}>{hostName}님과의 밸런스 지수 알아보기 🙄</span>

                <div className={styles.numberDiv}>
                    {mapNumber(count, current)}
                </div>

                <div className={styles.questionDiv}>
                    <QuestionDoingBox key={1} isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text="송강 호되게 혼내기" />
                    <span className={styles.versus}>VS</span>
                    <QuestionDoingBox key={2} isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
                    setThisSelected={setLatterSelected} setAnotherSelected={setFormerSelected} text="송강호 되게 혼내기"/>
                </div>

                <div className={styles.buttonDiv}>
                    <button className={`${styles.btn} ${styles.prevBtn}`}>이전</button>
                    <button className={`${styles.btn} ${styles.nextBtn}`}>다음</button>
                </div>
            </div>
        </Layout>
    );
}

export default DoGame;