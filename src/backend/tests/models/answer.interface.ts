import { AnswerLetter } from "./answer-letter.type";

export interface Answer {
  letter: AnswerLetter;
  answer: string;
}

export interface AnswerWithUuid extends Answer {
  uuid: string;
  id: number;
}
