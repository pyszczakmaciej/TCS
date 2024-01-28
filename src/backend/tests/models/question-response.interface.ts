import { AnswerLetter } from "./answer-letter.type";
import { AnswerWithUuid } from "./answer.interface";

export interface QuestionResponse {
  uuid: string;
  question: string;
  possibleAnswers: AnswerWithUuid[];
  correctAnswer: AnswerLetter;
}
