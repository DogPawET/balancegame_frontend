import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../Components/Shared/Layout';
import GradationButton from "../Components/Shared/GradationButton";
import styles from "../Styles/Result.module.css";
import { useRecoilValue } from "recoil";
import { guestGameState } from "../_recoil/state";

const Result = () => {
    const guestGame = useRecoilValue(guestGameState);

    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state.result;

    const onClickRank = () => {
        navigate(`/leader-board/${guestGame.hostId}`, {
            state: {
                uuid: guestGame.hostId,
            }
        });
    }

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.result}>
                <p className={styles.title}>{result.hostName} 밸런스게임 {result.guestName}의 결과</p>
                <p>
                    <span className={`${styles.blue} ${styles[`sub-title`]}`}>{result.score}개</span>
                    <span className={styles[`sub-title`]}>/</span>
                    <span className={`${styles.pink} ${styles[`sub-title`]}`}>{guestGame.questions.length}문제 중</span>
                </p>
                <div className={styles.table}>
                    <div className={styles.col}>
                        <p className={styles.header}>문제</p>
                        {guestGame.questions.map((value, index) => {
                            return (
                                <div key={index}>
                                    <div className={styles.question}>{value.firstOption}</div>
                                    <div className={styles.question}>{value.secondOption}</div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <p className={styles.header}>{result.hostName}</p>
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
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <p className={styles.header}>{result.guestName}</p>
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
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <GradationButton text="순위보기" onClick={onClickRank}/>
            </div>
        </Layout>
    );
}

export default Result;