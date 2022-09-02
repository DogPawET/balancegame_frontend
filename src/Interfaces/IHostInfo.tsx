import IQuestion from "./IQuestion";

export default interface IHostInfo {
    uuid: string;
    name: string;
    questionCount: number;
    questions: IQuestion[];
    answers: number[];
    index: number;
}