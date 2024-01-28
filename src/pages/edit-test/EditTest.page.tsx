import { ArrowBackIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestsService from "../../backend/tests/Tests.service";
import { QuestionResponse } from "../../backend/tests/models/question-response.interface";
import AppState from "../../store/App.state";
import "./EditTest.page.css";
import { QuestionCard } from "./components/question-card/QuestionCard.component";
import { QuestionDialog } from "./components/question-dialog/QuestionDialog.component";
export interface IEditTestPageProps {}

export function EditTestPage(props: IEditTestPageProps) {
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleClickOpen = (question?: QuestionResponse) => {
    setOpen(true);
    AppState.setValue("questionToEdit", question || null);
  };

  const handleClose = (reload: boolean) => {
    setOpen(false);
    AppState.setValue("questionToEdit", null);
    setShouldReload(reload);
  };

  useEffect(() => {
    params.testId || (params.testId && shouldReload)
      ? TestsService.fetchQuestions(params.testId).then((res) => {
          setQuestions(res);
          setShouldReload(false);
        })
      : null;
  }, [params.testId, shouldReload]);

  return (
    <div className="test-questions" {...props}>
      <div className="test-questions__header">
        <IconButton onClick={() => navigate("..")} sx={{ color: "white" }}>
          <ArrowBackIos />
        </IconButton>
        <p className="test-questions__header--title">Edycja testu</p>
        <button className="btn" onClick={() => handleClickOpen()}>
          Dodaj pytanie
        </button>
      </div>

      <div className="test-questions__content">
        <h3>Lista pytań</h3>
        <div className="test-questions__list">
          {questions.map((item) => {
            return (
              <QuestionCard
                handleEdit={handleClickOpen}
                key={item.uuid}
                question={item}
              />
            );
          })}
        </div>
      </div>
      <QuestionDialog
        testUuid={params.testId || ""}
        open={open}
        onClose={(val) => handleClose(val)}
      />
    </div>
  );
}
