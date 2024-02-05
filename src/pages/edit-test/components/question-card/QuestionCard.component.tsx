import {
  Button,
  Card,
  CardActions,
  CardContent,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import TestsService from "../../../../backend/tests/Tests.service";
import { QuestionResponse } from "../../../../backend/tests/models/question-response.interface";

export interface IQuestionCardProps {
  question: QuestionResponse;
  handleEdit: (question: QuestionResponse) => void;
}

const buttonSizeSx: SxProps<Theme> = {
  padding: "1rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "700",
};

export function QuestionCard(props: IQuestionCardProps) {
  const { question, handleEdit } = props;
  const matches = useMediaQuery("(min-width:1024px)");
  const params = useParams();

  const deleteQuestion = () => {
    if (!params.testId) return;
    TestsService.deleteQuestion(params.testId, question.uuid).then(() => {
      window.location.reload();
    });
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: "90%",
        background: "var(--color-dark)",
        color: "var(--color-darkWhite)",
        borderBottom: "2px solid var(--color-primary)",
      }}
    >
      <CardContent sx={{ padding: "1rem" }}>
        <Typography
          sx={{ maxWidth: "100%", overflowWrap: "break-word" }}
          variant="h4"
          component="div"
        >
          {question.question}
        </Typography>
        {question.possibleAnswers.map((answer, index) => {
          return (
            <Typography
              key={index}
              sx={{
                color:
                  answer.letter === question.correctAnswer
                    ? "var(--color-success)"
                    : "",
              }}
              gutterBottom
            >
              <b>{answer.letter}</b>: {answer.answer}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions
        sx={{
          // paddingBottom: "1rem",
          display: "flex",
          flexDirection: matches ? "row" : "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            onClick={() => handleEdit(question)}
            sx={{
              color: "var(--color-white)",
              background: "var(--color-blue)",
              ":hover": {
                color: "var(--color-white)",
                borderColor: "var(--color-blue)",
                background: "var(--color-blue)",
              },
              ":disabled": {
                color: "var(--color-primary)",
                background: "var(--color-secondary)",
                opacity: "0.4",
              },
              ...buttonSizeSx,
            }}
            variant="contained"
          >
            Edytuj
          </Button>

          <Button
            onClick={deleteQuestion}
            sx={{
              color: "var(--color-white)",
              borderColor: "var(--color-error)",
              background: "var(--color-error)",
              ":hover": {
                color: "var(--color-white)",
                background: "var(--color-error)",
              },
              ...buttonSizeSx,
            }}
            variant="contained"
          >
            Usuń
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
