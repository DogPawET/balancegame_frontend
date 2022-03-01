import Layout from '../Components/Shared/Layout';
import trophy from '../Sources/trophy.png';
import styles from './LeaderBoard.module.css';
import Medal from '../Components/LeaderBoard/Medal';
import GradationButton from '../Components/Shared/GradationButton';

function LeaderBoard() {
    const hostName = "정다은";
    const firstPlace = "양덕관";
    const secondPlace = "남민정";
    const thirdPlace = "배지수";

    const ranks = [1, 2, 3, 4, 5];
    const names = ["양덕관", "남민정", "배지수", "황주현", "장세연"];
    const percents = ["100%", "98%", "94%", "90%", "80%"];

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.leaderBoard}>
                <img className={styles.trophyImg} src={trophy} alt="Trophy Image"/>
                <span className={styles.title}>{hostName}님과의 찰떡궁합 명예의전당</span>
                <div className={styles.wrapperBox}>
                    <div className={styles.medalDiv}>
                    <Medal color="silver" name={secondPlace}/>
                    <Medal color="gold" name={firstPlace}/>
                    <Medal color="bronze" name={thirdPlace}/>
                    </div>
                    <hr className={styles.line}/>
                    <div className={styles.rankDiv}>
                        <div className={styles.list}>
                            <span className={styles.listTitle}>순위</span>
                            {ranks.map((rank) => (<span>{rank}</span>))}
                        </div>
                        <div className={styles.list}>
                            <span className={styles.listTitle}>이름</span>
                            {names.map((name) => (<span>{name}</span>))}
                        </div>
                        <div className={styles.list}>
                            <span className={styles.listTitle}>궁합지수</span>
                            {percents.map((percent) => (<span>{percent}</span>))}
                        </div>
                    </div>
                </div>
                <GradationButton text="내 퀴즈 만들어보기"/>
            </div>
        </Layout>
    );
}

export default LeaderBoard;