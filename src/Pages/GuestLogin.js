import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Shared/Layout';
import logo from '../Sources/logo.png';
import styles from "./HostLogin.module.css";
import GradationButton from '../Components/Shared/GradationButton';
import { Input } from 'antd';
import { useRecoilState } from "recoil";
import { userInfoState, guestGameState } from "../_recoil/state";
import axios from "axios";

const GuestLogin = () => {
    const navigate = useNavigate();
    const [hostId, setHostId] = useState("5a76d4d8-9f6b-412d-b6ef-04e5670a403a");
    const [hostName, setHostName] = useState("hostName");
    const [name, setName] = useState("");
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [guestGame, setGuestGame] = useRecoilState(guestGameState);

    const onClickGame = async () => {
        await axios.get(`http://localhost:80/api/${hostId}/questions`)
        .then ((response) => {
            console.log(response);
            setGuestGame({
                hostId: hostId,
                hostName: response.data.hostName,
                questions: response.data.questions,
            });
            setUserInfo({
                uuid: "guest",
                name: name,
                type: "guest",
            });
        })
        .catch ((error) => {
            console.log(error);
        });
        navigate("/dogame");
    }

    const onClickRank = () => {
        navigate("/leaderboard");
    }

    return (
        <Layout isHeaderOn={false}>
            <div className={styles[`login-wrapper`]}>
                <div className={styles[`login-title`]}>
                    <img className={styles[`login-logo`]} src={logo} alt="balance game logo"/>
                    <span className={styles[`main-title`]}>
                        너와 나의
                        <br/>
                        밸런스 지수 TEST
                    </span>
                    <span className={styles[`sub-title`]}>{hostName}님과의 밸런스 지수는?!</span>
                </div>
                <div className={styles[`login-content`]}>
                    <span className={styles[`content-text`]}>이름을 입력하세요</span>
                    <Input style={{ width: 200 }} onChange={(e) => {setName(e.target.value);}} placeholder="이름..." />
                    <GradationButton text="문제풀기" onClick={onClickGame}/>
                    <GradationButton text="순위보기" onClick={onClickRank}/>
                </div>
            </div>
        </Layout>
    );
}

export default GuestLogin;