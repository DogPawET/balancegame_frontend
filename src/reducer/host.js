const hostInfo = {
    uuid: "",
    name: "",
    questionCount: 3,
    questions: [],
    answers: [],
    index: 1,
}

const HOST_LOGIN = "HOST_LOGIN";
const SET_QUESTIONS = "SET_QUESTIONS";
const SET_ANSWERS = "SET_ANSWERS";
const SET_INDEX = "SET_INDEX";

export const hostLogin = (data) => {
    return {
        type: HOST_LOGIN,
        data,
    };
};

export const setQuestions = (data) => {
    return {
        type: SET_QUESTIONS,
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

const host = (state = hostInfo, action) => {
    switch(action.type) {
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

export default host;