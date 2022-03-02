import Layout from '../Components/Shared/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TempHostLogin() {
    const [name, setName] = useState("");
    const [questionNumber, setNumber] = useState(3);
    const current = 1;

    // React Router v6부터 useHistory -> useNavigate 로 변경됨
    const navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:80/api/host", {
            name: name,
            questionNumber: questionNumber
        })
        .then((response) => {
            console.log(response);
            
            navigate(
                "/makegame", {
                state: {
                    uuid: response.data.uuid,
                    name: name,
                    questionNumber: questionNumber,
                    current: current,
                    answers: [],
                    questions: []
                }
            })
        })
        .catch((error) => { console.log(error); })

        
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