import { AnswerLetter } from "./answer-letter.type";
import { Answer } from "./answer.interface";

export interface QuestionPayload {
  question: string;
  possibleAnswers: Answer[];
  correctAnswer: AnswerLetter;
}
