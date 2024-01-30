import { AnswerLetter } from "./answer-letter.type";

export interface SolveTestAnswer {
  questionUuid: string;
  selectedAnswer: AnswerLetter;
}
