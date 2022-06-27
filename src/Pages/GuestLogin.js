import React, { useEffect, useState, useCallback } from "react";
import { useForm} from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Components/Shared/Layout';
import logo from '../Sources/logo.png';
import styles from "../Styles/Login.module.css";
import GradationButton from '../Components/Shared/GradationButton';
import { useDispatch } from "react-redux";
import { guestLogin, setGame, initGuest } from "../reducer/guest";
import axios from "axios";

const GuestLogin = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const hostId = params.uuid;
    const [hostName, setHostName] = useState("");
    
    const getInfos = useCallback(async () => {
        await axios.get(`http://localhost:80/api/${hostId}/questions`)
        .then ((response) => {
            console.log(response);
            setHostName(response.data.hostName);
            dispatch(setGame({
                hostId,
                hostName: response.data.hostName,
                questions: response.data.questions,
            }));
        })
        .catch ((error) => {
            console.log(error);
        });
    }, [hostId, dispatch]);

    const onClickGame = () => {
        dispatch(guestLogin({
            name: watch("name"),
        }));
        navigate("/play");
    }

    const onClickRank = () => {
        navigate(`/leader-board/${hostId}`, {
            state: {
                uuid: params.uuid,
            }
        });
    }

    useEffect(() => {
        dispatch(initGuest());
        getInfos();
    }, [getInfos]);

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
                    <span className={styles.text}>{hostName}님과의 밸런스 지수는?!</span>
                </div>
                <div className={styles[`content-div`]}>
                    <form className={styles.form} onSubmit={handleSubmit(onClickGame)}>
                        <p className={styles.text}>이름을 입력하세요</p>
                        <input {...register("name", {required: true})}
                            className={styles.input}
                            placeholder="이름..."
                        />
                        {errors.name && <p className={`${styles.text} ${styles.errors}`}>이름이 입력되지 않았습니다</p>}
                        <GradationButton text="문제풀기"/>
                    </form>
                    <GradationButton text="순위보기" onClick={onClickRank}/>
                </div>
            </div>
        </Layout>
    );
}

export default GuestLogin;