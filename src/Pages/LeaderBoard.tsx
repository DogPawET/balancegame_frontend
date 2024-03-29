import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../Components/Shared/Layout';
import trophy from '../Sources/trophy.png';
import styles from '../Styles/LeaderBoard.module.css';
import Medal from '../Components/LeaderBoard/Medal';
import GradationButton from '../Components/Shared/GradationButton';
import axios from 'axios';

interface IState {
    uuid: string;
}

interface Guest {
    name: string;
    percentage: number;
}

const LeaderBoard = () => {
    const navigate = useNavigate();
    const state = useLocation().state as IState;

    const [hostName, setHostName] = useState("");
    const [guest, setGuest] = useState<Guest[]>([]);
    const [count, setCount] = useState(0);

    const goHostLogin = () => {
        navigate("/");
    }

    useEffect(() => {
        axios.get(`http://localhost:80/api/${state.uuid}/leader-board`)
        .then((response) => {
            console.log(response);

            setHostName(response.data.hostName);
            setGuest(response.data.guest.reverse());
            setCount(response.data.guest.length);
        })
        .catch((error) => { console.log(error); })
    }, [state.uuid]);

    return (
        <Layout isHeaderOn={true}>
            <div className={styles.leaderBoard}>
                <img className={styles.trophyImg} src={trophy} alt="Trophy"/>
                <span className={styles.title}>{hostName}님과의 찰떡궁합 명예의전당</span>
                <div className={styles.wrapperBox}>
                    <div className={styles.medalDiv}>
                    <Medal color="silver" name={count >= 2 ? guest[1].name : "-"}/>
                    <Medal color="gold" name={count >= 1 ? guest[0].name : "-"}/>
                    <Medal color="bronze" name={count >= 3 ? guest[2].name : "-"}/>
                    </div>
                    <hr className={styles.line}/>
                    <div className={styles.rankDiv}>
                        <div className={styles.list}>
                            <span className={styles.listTitle}>순위</span>
                            {guest.map((arr, index) => (<span key={index}>{index+1}</span>))}
                        </div>
                        <div className={styles.list}>
                            <span className={styles.listTitle}>이름</span>
                            {guest.map((arr, index) => (<span key={index}>{arr.name}</span>))}
                        </div>
                        <div className={styles.list}>
                            <span className={styles.listTitle}>궁합지수</span>
                            {guest.map((arr, index) => (<span key={index}>{arr.percentage}%</span>))}
                        </div>
                    </div>
                </div>
                <GradationButton text="내 퀴즈 만들어보기" onClick={goHostLogin}/>
            </div>
        </Layout>
    );
}

export default LeaderBoard;