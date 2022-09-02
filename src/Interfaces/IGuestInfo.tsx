import IGame from "./IGame";

export default interface IGuestInfo {
    game: IGame,
    name: string,
    answers: number[],
    index: number,
}