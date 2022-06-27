import { AnyAction } from "redux";
import IHostInfo from "../Interfaces/IHostInfo";
import IQuestion from "../Interfaces/IQuestion";

const hostInfo: IHostInfo = {
    uuid: "",
    name: "",
    questionCount: 3,
    questions: [],
    answers: [],
    index: 1,
}

const INIT_HOST = "INIT_HOST";
const HOST_LOGIN = "HOST_LOGIN";
const SET_QUESTIONS = "SET_QUESTIONS";
const SET_HOST_ANSWERS = "SET_ANSWERS";
const SET_HOST_INDEX = "SET_INDEX";

export const initHost = () => {
    return {
        type: INIT_HOST,
    };
};

interface IHostLogin {
    uuid: string;
    name: string;
    questionCount: number;
    questions: IQuestion[];
}

export const hostLogin = (data: IHostLogin) => {
    return {
        type: HOST_LOGIN,
        data,
    };
};

export const setQuestions = (data: IQuestion[]) => {
    return {
        type: SET_QUESTIONS,
        data,
    };
};

export const setHostAnswers = (data: number[]) => {
    return {
        type: SET_HOST_ANSWERS,
        data,
    };
};

export const setHostIndex = (data: number) => {
    return {
        type: SET_HOST_INDEX,
        data,
    };
};

const host = (state: IHostInfo = hostInfo, action: AnyAction) => {
    switch(action.type) {
        case INIT_HOST:
            localStorage.removeItem("persist:root");
            return {
                ...state,
                uuid: "",
                name: "",
                questionCount: 3,
                questions: [],
                answers: [],
                index: 1,
            }
        case HOST_LOGIN:
            return {
                ...state,
                uuid: action.data.uuid,
                name: action.data.name,
                questionCount: parseInt(action.data.questionCount),
                questions: [...action.data.questions],
            };
        case SET_QUESTIONS:
            return {
                ...state,
                questions: [...action.data],
            };
        case SET_HOST_ANSWERS:
            return {
                ...state,
                answers: [...action.data],
            };
        case SET_HOST_INDEX:
            return {
                ...state,
                index: state.index + action.data
            };
        default:
            return state;
    };
};

export default host;