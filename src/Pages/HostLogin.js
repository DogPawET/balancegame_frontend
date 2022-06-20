import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from '../Components/Shared/Layout';
import logo from '../Sources/logo.png';
import styles from "../Styles/Login.module.css";
import GradationButton from '../Components/Shared/GradationButton';
import { hostLogin, initHost } from "../reducer/host";
import { useDispatch } from "react-redux";
import QuestionList from "../QuestionList";

const HostLogin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        await axios.post("http://localhost:80/api/host", {
            name: watch("name"),
            questionNumber: watch("count"),
        })
        .then((response) => {

            let questions = [];
            const indexes = Array(45).fill().map((v, i) => i);
            for (let i=0; i<watch("count"); i++) {
                const randomIdx = Math.floor(Math.random() * indexes.length);
                const randomQuestion = QuestionList[indexes.splice(randomIdx, 1)[0]];
                questions.push(randomQuestion);
            }

            dispatch(hostLogin({
                uuid: response.data.uuid,
                name: watch("name"),
                questionCount: watch("count"),
                questions: questions,
            }));

            navigate("/build");
        })
        .catch((error) => { console.log(error.response); })
    }

    useEffect(() => {
        dispatch(initHost());
    }, []);

    return (
        <Layout isHeaderOn={false}>
            <div className={styles.wrapper}>
                <div className={styles[`title-div`]}>
                    <img className={styles.logo} src={logo} alt="balance game logo"/>
                    <span className={styles.title}>
                        너와 나의
                        <br/>
                        밸런스 지수 TEST
                    </span>
                    <span className={styles.text}>친구들은 내 밸런스 지수를 맞출 수 있을까?</span>
                </div>
                <form className={styles[`content-div`]} onSubmit={handleSubmit(onSubmit)}>
                    <p className={styles.text}>이름을 입력하세요</p>
                    <input
                        className={styles.input}
                        {...register("name", { required: true })}
                        placeholder="이름..."
                    />
                    {errors.name && <p className={`${styles.errors} ${styles.text}`}>이름이 입력되지 않았습니다</p>}                    <p className={styles.text}>
                        질문 개수를 정해주세요
                        <br/>
                        (3~10개)
                    </p>
                    <select
                        className={`${styles.count} ${styles.input}`}
                        {...register("count")}>
                        <option className={styles.count} value="3">3</option>
                        <option className={styles.count} value="4">4</option>
                        <option className={styles.count} value="5">5</option>
                        <option className={styles.count} value="6">6</option>
                        <option className={styles.count} value="7">7</option>
                        <option className={styles.count} value="8">8</option>
                        <option className={styles.count} value="9">9</option>
                        <option className={styles.count} value="10">10</option>
                    </select>
                    <GradationButton text="시작하기" />
                </form>
            </div>
        </Layout>
    );
}

export default HostLogin;