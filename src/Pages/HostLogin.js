import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../Components/Shared/Layout';
import logo from '../Sources/logo.png';
import styles from "./HostLogin.module.css";
import GradationButton from '../Components/Shared/GradationButton';
import { Input } from 'antd';
import { Select } from 'antd';
import { useRecoilState } from "recoil";
import { userInfoState } from "../_recoil/state";

const { Option } = Select;

const HostLogin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [questionCount, setQuestionCount] = useState(3);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const handleStart = async () => {
        await axios.post("http://localhost:80/api/host", {
            name: name,
            questionNumber: questionCount,
        })
        .then((response) => {
            console.log(response);
            
            setUserInfo({
                uuid: response.data.uuid,
                name: name,
                questionCount: questionCount,
                type: "host",
            })
            navigate("/makegame");
        })
        .catch((error) => { console.log(error.response); })
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
                    <span className={styles[`sub-title`]}>친구들은 내 밸런스 지수를 맞출 수 있을까?</span>
                </div>
                <div className={styles[`login-content`]}>
                    <span className={styles[`content-text`]}>이름을 입력하세요</span>
                    <Input style={{ width: 200 }} onChange={(e) => {setName(e.target.value);}} placeholder="이름..." />
                    <span className={styles[`content-text`]}>
                        질문 개수를 정해주세요
                        <br/>
                        (3~10개)
                    </span>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="질문 개수..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        defaultValue={{ value: "3" }}
                        onChange={(value) => {setQuestionCount(value);}}
                    >
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                    </Select>
                    <GradationButton text="시작하기" onClick={handleStart}/>
                </div>
            </div>
        </Layout>
    );
}

export default HostLogin;