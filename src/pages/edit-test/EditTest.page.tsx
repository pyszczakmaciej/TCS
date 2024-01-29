import { ArrowBackIos } from "@mui/icons-material";
import { Button, IconButton, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestsService from "../../backend/tests/Tests.service";
import { QuestionResponse } from "../../backend/tests/models/question-response.interface";
import { TestView } from "../../backend/tests/models/test-view.interface";
import AppState from "../../store/App.state";
import "./EditTest.page.css";
import { QuestionCard } from "./components/question-card/QuestionCard.component";
import { QuestionDialog } from "./components/question-dialog/QuestionDialog.component";
export interface IEditTestPageProps {}

export function EditTestPage(props: IEditTestPageProps) {
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [testDetails, setTestDetails] = useState<TestView | null>(null);
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
    if (params.testId && !testDetails) {
      TestsService.fetchTest(params.testId).then((res) => {
        setTestDetails(res);

        TestsService.fetchQuestions(res.uuid).then((res) => {
          setQuestions(res);
          setShouldReload(false);
        });
      });
    } else if (params.testId || (params.testId && shouldReload)) {
      TestsService.fetchQuestions(params.testId).then((res) => {
        setQuestions(res);
        setShouldReload(false);
      });
    }
  }, [params.testId, shouldReload, testDetails]);

  return (
    <div className="test-questions" {...props}>
      <div className="test-questions__header">
        <IconButton onClick={() => navigate("..")} sx={{ color: "white" }}>
          <ArrowBackIos />
        </IconButton>
        <Typography>
          Edytujesz: <b>{testDetails?.name}</b>
        </Typography>
        <Button
          variant="contained"
          sx={{
            padding: "1rem 2rem",
            background: "var(--color-blue)",
            color: "var(--color-white)",
            ":hover": {
              background: "var(--color-blue)",
              color: "var(--color-white)",
            },
          }}
          onClick={() => handleClickOpen()}
        >
          Dodaj pytanie
        </Button>
      </div>

      <div
        style={{
          width: "100%",
        }}
      >
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {questions.map((item) => {
            return (
              <QuestionCard
                handleEdit={handleClickOpen}
                key={item.uuid}
                question={item}
              />
            );
          })}
        </List>
      </div>
      <QuestionDialog
        testUuid={params.testId || ""}
        open={open}
        onClose={(val) => handleClose(val)}
      />
    </div>
  );
}
