import axios, { AxiosResponse } from "axios";
import AppState from "../../store/App.state";
import { QuestionPayload } from "./models/question-payload.interface";
import { SolveTestPayload } from "./models/solve-test-payload.interface";

const apiUrl = `${AppState.getValue("apiUrl")}/tests`;

interface ErrorResponse {
  response: {
    data: string;
  };
}

const alertError = (message: string): void => {
  alert(`Serwer zwrócił błąd: ${message}`);
};

const successMessage = (message: string): void => {
  alert(`Brawo: ${message}`);
};

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

const fetchTest = async (testUuid: string) => {
  return await axios
    .get(`${apiUrl}/${testUuid}`)
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
    .catch((err: ErrorResponse) => {
      alertError(err.response.data);
    });
};

const fetchTestToSolve = async (testUuid: string) => {
  return await axios
    .get(`${apiUrl}/${testUuid}/questions/all`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchTestSummary = async (testUuid: string) => {
  return await axios
    .get(`${apiUrl}/${testUuid}/summary`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const sentTestToCheck = async (
  testUuid: string,
  payload: SolveTestPayload
): Promise<void | AxiosResponse<string, string>> => {
  return await axios
    .put(`${apiUrl}/${testUuid}/solve`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err: ErrorResponse) => {
      alertError(err.response.data);
    });
};

const activateTest = async (testUuid: string) => {
  return await axios
    .put(`${apiUrl}/${testUuid}/activate`)
    .then((res) => {
      successMessage("Test został aktywowany!");
      window.location.reload();
      return res.data;
    })
    .catch((err: ErrorResponse) => {
      alertError(err.response.data);
    });
};

const fetchQuestions = async (testUuid: string) => {
  return await axios
    .get(`${apiUrl}/${testUuid}/questions`)
    .then((res) => {
      return res.data;
    })
    .catch((err: ErrorResponse) => alertError(err.response.data));
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

const deleteQuestion = async (testUuid: string, questionUuid: string) => {
  return axios
    .delete(`${apiUrl}/${testUuid}/questions/${questionUuid}`)
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
  fetchTest,
  fetchTestToSolve,
  fetchTestSummary,
  createTest,
  sentTestToCheck,
  activateTest,
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

export default TestsService;
