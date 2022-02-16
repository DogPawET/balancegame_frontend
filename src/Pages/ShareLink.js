import { useState } from 'react';
import Layout from '../Components/Shared/Layout';
import styles from './ShareLink.module.css';

function ShareLink() {
    const [showCopied, setShowCopied] = useState(false);

    const hideCopied = () => {
        setShowCopied(false);
    }

    const alertCopied = () => {
        setShowCopied(true);
        setTimeout(hideCopied, 2000);
    }

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.shareLink}>
                <span className={styles.title}>💖 밸런스게임 완성 💖</span>
                <span className={styles.description}>친구들에게도 공유해보세요!
                    <br/>링크에서 친구들의 순위도 확인할 수 있습니다 😉
                </span>

                <div className={styles.wrapperBox}>
                    <div className={styles.linkBox}>
                        <span className={`${styles.description} ${styles.linkText}`}>
                            https://localhost:link/hahahah
                        </span>
                    </div>
                    {showCopied ? 
                    <span className={`${styles.description} ${styles.copiedText}`}>
                        링크가 복사되었습니다 🙌
                    </span>
                    :
                    null
                    }
                    <button className={styles.gradationBtn} onClick={alertCopied}>
                        <span className={styles.btnText}>
                            링크복사 
                        </span>
                    </button>
                </div>

            </div>
        </Layout>
    );
}

export default ShareLink;