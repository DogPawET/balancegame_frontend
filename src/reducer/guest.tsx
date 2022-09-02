import { AnyAction } from "redux";
import IGuestInfo from "../Interfaces/IGuestInfo";

const guestInfo: IGuestInfo = {
    game: {
        hostId: "",
        hostName: "",
        questions: [],
    },
    name: "",
    answers: [],
    index: 1,
}

const INIT_GUEST = "INIT_GUEST";
const GUEST_LOGIN = "GUEST_LOGIN";
const SET_GAME = "SET_GAME";
const SET_GUEST_ANSWERS = "SET_GUEST_ANSWERS";
const SET_GUEST_INDEX = "SET_GUEST_INDEX";

export const initGuest= () => {
    return {
        type: INIT_GUEST,
    };
};

interface IGuestLogin {
    name: string;
}

export const guestLogin = (data: IGuestLogin) => {
    return {
        type: GUEST_LOGIN,
        data,
    };
};

interface ISetGame {
    hostId: string;
    hostName: string;
    questions: Object[];
}

export const setGame = (data: ISetGame) => {
    return {
        type: SET_GAME,
        data,
    };
};

export const setGuestAnswers = (data: number[]) => {
    return {
        type: SET_GUEST_ANSWERS,
        data,
    };
};

export const setGuestIndex = (data: number) => {
    return {
        type: SET_GUEST_INDEX,
        data,
    };
};

const guest = (state = guestInfo, action: AnyAction) => {
    switch(action.type) {
        case INIT_GUEST: 
            localStorage.removeItem("persist:root");
            return {
                ...state,
                game: {
                    hostId: "",
                    hostName: "",
                    questions: [],
                },
                name: "",
                answers: [],
                index: 1,
            }
        case GUEST_LOGIN:
            return {
                ...state,
                name: action.data.name,
            };
        case SET_GAME:
            return {
                ...state,
                game: {
                    ...state.game,
                    hostId: action.data.hostId,
                    hostName: action.data.hostName,
                    questions: [...action.data.questions],
                },
            };
        case SET_GUEST_ANSWERS:
            return {
                ...state,
                answers: [...action.data],
            };
        case SET_GUEST_INDEX:
            return {
                ...state,
                index: state.index + action.data
            };
        default:
            return state;
    };
};

export default guest;