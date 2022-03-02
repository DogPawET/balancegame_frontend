import Layout from '../Components/Shared/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TempHostLogin() {
    const [name, setName] = useState("");
    const [questionNumber, setNumber] = useState(3);
    const [userId, setUserId] = useState("");

    // React Router v6부터 useHistory -> useNavigate 로 변경됨
    const navigate = useNavigate();

    const login = async () => {
        /* async, await 사용하지 않으면 axios 작업 기다리지 않고 navigate가 실행될 수 있음
        -> Warning: Can't perform a React state update on an unmounted component.
        This is a no-op, but it indicates a memory leak in your application.
        To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup
        메모리 누수 발생할 수 있음 */

        await axios.post("http://localhost:80/api/host", {
            name: name,
            questionNumber: questionNumber
        })
        .then((response) => {
            console.log(response);
            console.log(response.data.uuid);
            setUserId(response.data.uuid);
        })
        .catch((error) => { console.log(error); })

        /* navigate 사용하지 않고 button 컴포넌트를 바로 Link 컴포넌트로 감싸줄 경우에도
        위에서 설명한 메모리 누수 경고가 발생할 수 있음 */
        navigate(
            "/makegame", {
            state: {
                userId: userId,
                name: name,
                questionNumber: questionNumber
            }
        })
    }

    return (
        <Layout isHeaderOn={true}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1>밸런스게임</h1>
                <input placeholder="userName" onChange={(e) => setName(e.target.value) }></input>
                <input placeholder="number" onChange={(e) => setNumber(e.target.value) }></input>
                <button onClick={login}>로그인</button>
            </div>
        </Layout>
    );
}

export default TempHostLogin;