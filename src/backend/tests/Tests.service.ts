import axios, { AxiosResponse } from "axios";
import AppState from "../../store/App.state";
import { QuestionPayload } from "./models/question-payload.interface";

const apiUrl = `${AppState.getValue("apiUrl")}/tests`;

const fetchTests = async () => {
  return await axios
    .get(`${apiUrl}`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const createTest = async (
  name: string
): Promise<void | AxiosResponse<string, string>> => {
  return await axios
    .post(apiUrl, { name })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const activateTest = async (testUuid: string) => {
  return await axios
    .put(`${apiUrl}/${testUuid}/activate`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

const fetchQuestions = async (testUuid: string) => {
  return await axios
    .get(`${apiUrl}/${testUuid}/questions`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const createQuestion = async (testUuid: string, data: QuestionPayload) => {
  return axios
    .post(`${apiUrl}/${testUuid}/questions`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const updateQuestion = async (
  testUuid: string,
  questionUuid: string,
  data: QuestionPayload
) => {
  return axios
    .put(`${apiUrl}/${testUuid}/questions/${questionUuid}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const TestsService = {
  fetchTests,
  createTest,
  activateTest,
  fetchQuestions,
  createQuestion,
  updateQuestion,
};

export default TestsService;
