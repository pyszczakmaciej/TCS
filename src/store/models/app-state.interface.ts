import { Signal } from "@preact/signals-react";
import { User } from "../../backend/auth/models/user.interface";
import { QuestionResponse } from "../../backend/tests/models/question-response.interface";

export interface IAppState {
  user: Signal<User | null>;
  tests: Signal<string[]>;
  token: Signal<string | null>;
  questionToEdit: Signal<QuestionResponse | null>;

  readonly apiUrl: Signal<string>;
}
