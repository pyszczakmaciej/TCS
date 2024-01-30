import { SolvedQuestion } from "./solved-question.interface";
import { TestView } from "./test-view.interface";

export interface SolvedTest extends TestView {
  questions: SolvedQuestion[];
}
