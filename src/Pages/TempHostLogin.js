import Layout from '../Components/Shared/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TempHostLogin() {
    // React Router v6부터 useHistory -> useNavigate 로 변경됨
    const navigate = useNavigate();

    /* 임시 호스트 로그인 */
    const [name, setName] = useState("");
    const [questionNumber, setNumber] = useState(3);
    const index = 1;

    const login = () => {
        /* 📌 axios 활용 방법 참고 */
        axios.post("http://localhost:80/api/host", {
            name: name,
            questionNumber: questionNumber
        })
        .then((response) => {
            console.log(response);
            
            /* 📌 useNavigate 활용하여 state 넘기는 방법 참고 */
            navigate(
                "/makegame", {
                state: { 
                    uuid: response.data.uuid,
                    name: name,
                    questionNumber: questionNumber,
                    index: index,
                    answers: [],
                    questions: []
                }
            })
        })
        .catch((error) => { console.log(error); })
    }
    /********************/

    
    /* 임시 게스트 등록 */
    const postGuest = () => {
        var guestAnswers = [0,1,0,1,0];
        axios.post("http://localhost:80/api/guest", {
            answers: guestAnswers,
            name: "hehe",
            uuid: "67aa93f7-f5e4-4ba5-a5ae-4451e1813abb"
        })
        .then((response) => { console.log(response); })
        .catch((error) => { console.log(error); })
    }
    /******************/

    
    return (
        <Layout isHeaderOn={true}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1>밸런스게임</h1>
                <input placeholder="userName" onChange={(e) => setName(e.target.value) }></input>
                <input placeholder="number" onChange={(e) => setNumber(e.target.value) }></input>
                <button onClick={login}>로그인</button>
                <br/>
                <h3>게스트 정보는 TempHostLogin 컴포넌트 postGuest 함수에서 직접 수정해서 테스트</h3>
                <button onClick={postGuest}>임시 게스트 등록</button>
            </div>
        </Layout>
    );
}

export default TempHostLogin;