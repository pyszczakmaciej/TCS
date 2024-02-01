import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  List,
  Radio,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import TestsService from "../../../../backend/tests/Tests.service";
import { AnswerLetter } from "../../../../backend/tests/models/answer-letter.type";
import { QuestionResponse } from "../../../../backend/tests/models/question-response.interface";
import { SolveTestAnswer } from "../../../../backend/tests/models/solve-test-answer.interface";
import { SolveTestPayload } from "../../../../backend/tests/models/solve-test-payload.interface";
import { TestToSolve } from "../../../../backend/tests/models/test-to-solve.interface";
import "./SolveTestDialog.component.css";

export interface ISolveTestDialogProps {
  open: boolean;
  onClose: (reload: boolean) => void;
  testUuid: string;
}

export function SolveTestDialog(props: ISolveTestDialogProps) {
  const { onClose, open, testUuid } = props;
  const matches = useMediaQuery("(max-width:1440px)");

  const [payload, setPayload] = useState<SolveTestPayload>({
    answers: [],
  });

  const [selectedAnswersNum, setSelectedAnswersNum] = useState(0);

  const [testToSolve, setTestToSolve] = useState<TestToSolve | null>(null);

  useEffect(() => {
    if (testToSolve || !testUuid) return;

    TestsService.fetchTestToSolve(testUuid).then((res) => {
      const initialPayloadArray: SolveTestAnswer[] = res.questions.map(
        (question: Omit<QuestionResponse, "correctAnswer">) => {
          return {
            questionUuid: question.uuid,
            selectedAnswer: "",
          };
        }
      );
      setTestToSolve(res);
      setPayload({ answers: initialPayloadArray });
    });
  }, [testUuid, testToSolve]);

  const selectAnswer = (questionUuid: string, selectedAnswer: AnswerLetter) => {
    setPayload({
      answers: payload.answers.map((item) => {
        if (item.questionUuid === questionUuid) {
          if (!item.selectedAnswer) {
            setSelectedAnswersNum(selectedAnswersNum + 1);
          }
          return {
            questionUuid,
            selectedAnswer,
          };
        }
        return item;
      }),
    });
  };

  const checkIfSelected = (
    questionUuid: string,
    letter: AnswerLetter
  ): boolean => {
    return Boolean(
      payload.answers.find(
        (item) =>
          item.questionUuid === questionUuid && item.selectedAnswer === letter
      )
    );
  };

  const handleClose = (reload: boolean) => {
    onClose(reload);
  };

  const sentToCheck = async () => {
    if (!testToSolve) return;
    await TestsService.sentTestToCheck(testToSolve.uuid, payload).then(() => {
      handleClose(true);
    });
  };

  return (
    <React.Fragment>
      <Dialog
        scroll="body"
        sx={{ height: "100%" }}
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar
          sx={{
            position: "relative",
            background: "var(--color-dark)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "var(--color-white)",
            }}
          >
            <IconButton
              sx={{ width: "5%" }}
              edge="start"
              onClick={() => handleClose(false)}
              aria-label="close"
            >
              <CloseIcon sx={{ color: "var(--color-white)" }} />
            </IconButton>
            <Typography sx={{ width: "95%" }} variant="h4">
              {testToSolve?.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ background: "var(--color-dark)", height: "100%" }}>
          {testToSolve?.questions.map((question, index) => {
            return (
              <List
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    minWidth: 275,
                    width: matches ? "90%" : "70%",
                    background: "var(--color-dark)",
                    color: "var(--color-darkWhite)",
                    borderBottom: "2px solid var(--color-primary)",
                  }}
                >
                  <CardContent
                    sx={{ padding: "1rem", color: "var(--color-white)" }}
                  >
                    <Typography
                      sx={{
                        maxWidth: "100%",
                        color: "var(--color-darkWhite)",
                        overflowWrap: "break-word",
                        fontWeight: "normal",
                      }}
                      variant="h4"
                      component="div"
                    >
                      {`Pytanie ${index + 1}: ${question.question}`}
                    </Typography>

                    {question.possibleAnswers.map((possibleAnswer, index) => {
                      return (
                        <div
                          onClick={() =>
                            selectAnswer(question.uuid, possibleAnswer.letter)
                          }
                          className={
                            checkIfSelected(
                              question.uuid,
                              possibleAnswer.letter
                            )
                              ? "solve-test__dialog__answer--selected"
                              : "solve-test__dialog__answer"
                          }
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.5rem",

                            overflowWrap: "break-word",
                          }}
                          key={index}
                        >
                          <Typography
                            sx={{
                              color: "var(--color-white)",
                              opacity: "0.5",
                              fontWeight: "normal",
                            }}
                          >{`${possibleAnswer.letter}) ${possibleAnswer.answer}`}</Typography>
                          <FormControlLabel
                            label=""
                            sx={{
                              padding: "0",
                              margin: "0",
                            }}
                            checked={checkIfSelected(
                              question.uuid,
                              possibleAnswer.letter
                            )}
                            onChange={() =>
                              selectAnswer(question.uuid, possibleAnswer.letter)
                            }
                            control={
                              <Radio
                                sx={{
                                  color: "var(--color-white)",
                                  "&.Mui-checked": {
                                    color: "var(--color-white)",
                                  },
                                }}
                              />
                            }
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </List>
            );
          })}
        </DialogContent>
        <DialogActions
          sx={{
            position: "sticky",
            bottom: "0",
            background: "var(--color-dark)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              position: "sticky",
              bottom: "0",
            }}
          >
            <Typography
              sx={{
                color:
                  selectedAnswersNum !== testToSolve?.questions.length
                    ? "var(--color-warning)"
                    : "var(--color-success)",
              }}
            >
              Udzielone odpowiedzi:{" "}
              {`${selectedAnswersNum}/${testToSolve?.questions.length}`}
            </Typography>
            <Button
              autoFocus
              variant="contained"
              sx={{
                minWidth: 120,
                padding: "0.5rem",
                background: "var(--color-blue)",
                ":hover": { background: "var(--color-success)" },
                ":disabled": {
                  background: "var(--color-secondary)",
                  color: "var(--color-primary)",
                },
              }}
              onClick={sentToCheck}
              disabled={selectedAnswersNum !== testToSolve?.questions.length}
            >
              Wyślij do sprawdzenia
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
