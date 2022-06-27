export default interface IQuestionBox {
    isFormer: boolean;
    thisSelected: boolean;
    anotherSelected: boolean;
    setThisSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setAnotherSelected: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
}