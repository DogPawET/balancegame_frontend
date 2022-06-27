import IQuestion from "./IQuestion";

export default interface IGame {
    hostId: string;
    hostName: string;
    questions: IQuestion[];
}