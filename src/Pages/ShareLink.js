import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Layout from '../Components/Shared/Layout';
import styles from '../Styles/ShareLink.module.css';
import axios from "axios";
import { useRecoilState } from "recoil";
import { hostInfoState, indexState, hostGameState } from "../_recoil/state";

const ShareLink = () => {
    const [hostInfo, setHostInfo] = useRecoilState(hostInfoState);
    const [index, setIndex] = useRecoilState(indexState);
    const [hostGame, setHostGame] = useRecoilState(hostGameState);

    const [showCopied, setShowCopied] = useState(false);

    const hideCopied = () => {
        setShowCopied(false);
    }

    const alertCopied = () => {
        setShowCopied(true);
        setTimeout(hideCopied, 2000);
    }

    const postGame = async () => {
        axios.post("http://localhost:80/api/balanceGame", {
            answers: hostGame.answers,
            questions: hostGame.questions,
            uuid: hostInfo.uuid,
        })
        .then((response) => {
            setIndex(1);
        }).catch ((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        postGame();
    }, []);

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.shareLink}>
                <span className={styles.title}>💖 {hostInfo.name}님의 밸런스게임이 완성 되었습니다 💖</span>
                <span className={styles.description}>친구들에게도 공유해보세요!
                    <br/>링크에서 친구들의 순위도 확인할 수 있습니다 😉
                </span>

                <div className={styles.wrapperBox}>
                    <div className={styles.linkBox}>
                        <span className={`${styles.description} ${styles.linkText}`}>
                            {`http://localhost:3000/balance-game/${hostInfo.uuid}`}
                        </span>
                    </div>
                    {showCopied ? 
                    <span className={`${styles.description} ${styles.copiedText}`}>
                        링크가 복사되었습니다 🙌
                    </span>
                    :
                    null
                    }
                    <CopyToClipboard text={`http://localhost:3000/balance-game/${hostInfo.uuid}`}>
                        <button className={styles.gradationBtn} onClick={alertCopied}>
                            <span className={styles.btnText}>
                                링크복사 
                            </span>
                        </button>
                    </CopyToClipboard>
                </div>

            </div>
        </Layout>
    );
}

export default ShareLink;