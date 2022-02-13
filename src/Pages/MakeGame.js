import { useState } from 'react';
import Layout from '../Components/Shared/Layout';
import QuestionNumber from '../Components/MakeGame/QuestionNumber';
import QuestionBox from '../Components/MakeGame/QuestionBox';
import styles from './MakeGame.module.css';

function MakeGame() {
    const count = 10;
    const current = 1;
    const [formerSelected, setFormerSelected] = useState(false);
    const [latterSelected, setLatterSelected] = useState(false);

    function mapNumber(count, current) {
        const numbers = [];
        for (let i=1; i<=count; i++) {
            numbers.push(<QuestionNumber number={i} activated={i === current ? true : false} />)
        }
        return numbers;
    }

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.makeGame}>
                <span className={styles.title}>밸런스게임 만들기 ✍</span>

                <div className={styles.numberDiv}>
                    {mapNumber(count, current)}
                </div>

                <div className={styles.questionDiv}>
                    <a className={styles.skip} href="/MakeGame">이 문제 건너뛰기 👉</a> 
                    <QuestionBox isFormer={true} thisSelected={formerSelected} anotherSelected={latterSelected}
                    setThisSelected={setFormerSelected} setAnotherSelected={setLatterSelected} text="송강 호되게 혼내기" />
                    <span className={styles.versus}>VS</span>
                    <QuestionBox isFormer={false} thisSelected={latterSelected} anotherSelected={formerSelected}
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

export default MakeGame;