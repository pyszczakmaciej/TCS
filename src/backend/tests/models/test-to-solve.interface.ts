import { QuestionResponse } from "./question-response.interface";
import { TestView } from "./test-view.interface";

export interface TestToSolve extends TestView {
  questions: Omit<QuestionResponse, "correctAnswer">[];
}
