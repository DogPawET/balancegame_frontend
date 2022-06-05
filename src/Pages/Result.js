import React from "react";
import { useLocation } from "react-router-dom";
import Layout from '../Components/Shared/Layout';
import styles from "./Result.module.css";
import { useRecoilState } from "recoil";
import { guestInfoState, guestGameState } from "../_recoil/state";

const Result = () => {
    const [guestInfo, setGuestInfo] = useRecoilState(guestInfoState);
    const [guestGame, setGuestGame] = useRecoilState(guestGameState);
    const location = useLocation();
    const result = location.state.result;

    /*
    const guestInfo = {
        hostName: "dyanii",
    };

    const guestGame = {
        questions: [
            {
                firstOption: "송강 호되게 혼내기",
                secondOption: "송강호 되게 혼내기"
            },
            {
                firstOption: "송강 호되게 혼내기",
                secondOption: "송강호 되게 혼내기"
            },
            {
                firstOption: "송강 호되게 혼내기",
                secondOption: "송강호 되게 혼내기"
            },
        ],
    }

    const result = {
        hostAnswers: [0, 1, 0],
        guestAnswers: [1, 0, 1],
    }
    */

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.result}>
                <p className={styles.title}>{result.hostName} 밸런스게임 {result.guestName}의 결과</p>
                <p>
                    <span className={`${styles.pink} ${styles[`sub-title`]}`}>{result.score}개</span>
                    <span className={styles[`sub-title`]}>/</span>
                    <span className={`${styles.blue} ${styles[`sub-title`]}`}>{guestGame.questions.length}문제 중</span>
                </p>
                <div className={styles.table}>
                    <div className={styles.col}>
                        <p>문제</p>
                        {guestGame.questions.map((value, index) => {
                            return (
                                <div key={index}>
                                    <div className={styles.question}>{value.firstOption}</div>
                                    <div className={styles.question}>{value.secondOption}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <p>host</p>
                        {location.state.result.hostAnswers.map((value, index) => {
                            return (
                                <div key={index}>
                                    {value === 0 ?
                                    <>
                                        <div className={styles.pink}>O</div>
                                        <div className={styles.hidden}>O</div>
                                    </>
                                    :
                                    <>
                                        <div className={styles.hidden}>O</div>
                                        <div className={styles.pink}>O</div>
                                    </>
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <p>guest</p>
                        {location.state.result.guestAnswers.map((value, index) => {
                            return (
                                <div key={index}>
                                    {value ===  0 ?
                                    <>
                                        <div className={styles.blue}>O</div>
                                        <div className={styles.hidden}>O</div>
                                    </>
                                    :
                                    <>
                                        <div className={styles.hidden}>O</div>
                                        <div className={styles.blue}>O</div>
                                    </>
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Result;