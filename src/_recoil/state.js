import { atom } from "recoil";

export const userInfoState = atom({
    key: "userInfo",
    default: {},
})

export const indexState = atom({
    key: "index",
    default: 1,
});

export const hostGameState = atom({
    key: "hostGame",
    default: {
        answers: [],
        questions: [],
    },
});

export const makingOptsState = atom({
    key: "makingOpts",
    default: [],
})

export const doingOptsState = atom({
    key: "doingOpts",
    default: [],
});

