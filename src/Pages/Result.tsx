import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../Components/Shared/Layout';
import GradationButton from "../Components/Shared/GradationButton";
import styles from "../Styles/Result.module.css";
import { useSelector } from "react-redux";
import { IRootState } from "../reducer";
import IQuestion from "../Interfaces/IQuestion";
import IGame from "../Interfaces/IGame";

interface IIGame {
    game: IGame;
}

interface IResult {
    guestName: string;
    hostName: string;
    percentage: number;
    questions: IQuestion[];
    score: number;
    hostAnswers: number[];
    guestAnswers: number[];
}

interface IState {
    result: IResult;
}

const Result = () => {
    const { game }: IIGame = useSelector((state: IRootState) => state.guest);
    const navigate = useNavigate();
    const result = (useLocation().state as IState).result;

    const onClickRank = () => {
        navigate(`/leader-board/${game.hostId}`, {
            state: {
                uuid: game.hostId,
            }
        });
    }

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.result}>
                <p className={styles.title}>{result.hostName}님의 밸런스게임 <br/> {result.guestName}님의 결과</p>
                <p>
                    <span className={`${styles.pink} ${styles[`sub-title`]}`}>{result.score}개</span>
                    <span className={styles[`sub-title`]}>/</span>
                    <span className={`${styles.blue} ${styles[`sub-title`]}`}>{result.questions.length}문제 중</span>
                </p>
                <div className={styles.table}>
                    <div className={styles.col}>
                        <span className={styles.header}>문제</span>
                        {result.questions.map((value, index) => {
                            return (
                                <div key={index} className={styles.square}>
                                    <div className={styles.question}>{value.firstOption}</div>
                                    <div className={styles.question}>{value.secondOption}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <span className={styles.header}>{result.hostName}</span>
                        {result.hostAnswers.map((value, index) => {
                            return (
                                <div key={index} className={styles.square}>
                                    {value === 0 ?
                                    <>
                                        <div className={`${styles.pink} ${styles.circle}`}>O</div>
                                        <div className={`${styles.hidden} ${styles.circle}`}>O</div>
                                    </>
                                    :
                                    <>
                                        <div className={`${styles.hidden} ${styles.circle}`}>O</div>
                                        <div className={`${styles.blue} ${styles.circle}`}>O</div>
                                    </>
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <span className={styles.header}>{result.guestName}</span>
                        {result.guestAnswers.map((value, index) => {
                            return (
                                <div key={index} className={styles.square}>
                                    {value ===  0 ?
                                    <>
                                        <div className={`${styles.pink} ${styles.circle}`}>O</div>
                                        <div className={`${styles.hidden} ${styles.circle}`}>O</div>
                                    </>
                                    :
                                    <>
                                        <div className={`${styles.hidden} ${styles.circle}`}>O</div>
                                        <div className={`${styles.blue} ${styles.circle}`}>O</div>
                                    </>
                                    }
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