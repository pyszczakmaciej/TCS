import { SolvedTest } from "./solved-test.interface";
import { TestSummary } from "./test-summary.interface";

export interface SolvedTestSummary {
  testResultUuid: string;
  summary: TestSummary;
  test: SolvedTest;
}
