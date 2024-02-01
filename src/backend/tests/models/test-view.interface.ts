import { Author } from "./author.interface";

export interface TestView {
  uuid: string;
  name: string;
  active: boolean;
  createdAt: string;
  author: Author;
  solvedByLoggedUser: boolean;
}
