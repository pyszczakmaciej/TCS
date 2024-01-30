import { AnswerLetter } from "./answer-letter.type";
import { QuestionResponse } from "./question-response.interface";

export interface SolvedQuestion extends QuestionResponse {
  correct: boolean;
  selectedAnswer: AnswerLetter;
}
