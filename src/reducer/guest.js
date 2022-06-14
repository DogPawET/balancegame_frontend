const guestInfo = {
    game: {
        hostId: "",
        hostName: "",
        questions: [],
    },
    name: "",
    answers: [],
    index: 1,
}

const GUEST_LOGIN = "GUEST_LOGIN";
const SET_GAME = "SET_GAME";
const SET_ANSWERS = "SET_ANSWERS";
const SET_INDEX = "SET_INDEX";

export const guestLogin = (data) => {
    return {
        type: GUEST_LOGIN,
        data,
    };
};

export const setGame = (data) => {
    return {
        type: SET_GAME,
        data,
    };
};

export const setAnswers = (data) => {
    return {
        type: SET_ANSWERS,
        data,
    };
};

export const setIndex = (data) => {
    return {
        type: SET_INDEX,
        data,
    };
};

const guest = (state = guestInfo, action) => {
    switch(action.type) {
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
        case SET_ANSWERS:
            return {
                ...state,
                answers: [...action.data],
            };
        case SET_INDEX:
            return {
                ...state,
                index: state.index + action.data
            };
        default:
            return state;
    };
};

export default guest;