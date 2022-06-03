import { atom } from "recoil";

export const hostInfoState = atom({
    key: "hostInfo",
    default: {},
});

export const guestInfoState = atom({
    key: "guestInfo",
    default: {},
});

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

export const guestGameState = atom({
    key: "guestGame",
    default: {
        hostId: "",
        hostName: "",
        questions: [],
    }
});

export const makingOptsState = atom({
    key: "makingOpts",
    default: [],
});

export const doingOptsState = atom({
    key: "doingOpts",
    default: [],
});