import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Card,
  CardContent,
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
import { AnswerWithUuid } from "../../../../backend/tests/models/answer.interface";
import { SolvedQuestion } from "../../../../backend/tests/models/solved-question.interface";
import { SolvedTestSummary } from "../../../../backend/tests/models/solved-test-summary.interface";

export interface ISolvedTestSummaryDialogProps {
  open: boolean;
  onClose: (reload: boolean) => void;
  testUuid: string;
}

export function SolvedTestSummaryDialog(props: ISolvedTestSummaryDialogProps) {
  const { onClose, open, testUuid } = props;
  const matches = useMediaQuery("(max-width:1440px)");

  const [state, setState] = useState<SolvedTestSummary | null>(null);

  useEffect(() => {
    if (state || !testUuid) return;

    TestsService.fetchTestSummary(testUuid).then((res) => {
      console.log(res);
      setState(res);
    });
  }, [testUuid, state]);

  const handleClose = (reload: boolean) => {
    onClose(reload);
    resetState();
  };

  const resetState = () => {
    setState(null);
  };

  const getStylesForCorrectAnswer = (
    question: SolvedQuestion,
    possibleAnswer: AnswerWithUuid
  ) => {
    if (
      question.selectedAnswer === possibleAnswer.letter &&
      question.selectedAnswer !== question.correctAnswer
    ) {
      // incorrect
      return {
        background: "var(--color-error)",
      };
    } else if (question.correctAnswer === possibleAnswer.letter) {
      if (question.selectedAnswer !== question.correctAnswer) {
        //correct when answer is incorrect
        return {
          color: "var(--color-success)",
          opacity: "1",
          fontWeight: "bold",
        };
      } else {
        //correct when answer is correct
        return {
          opacity: 1,
          background: "var(--color-success)",
        };
      }
    } else {
      //basic answer
      return {};
    }
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ height: "100%" }}
        scroll="paper"
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
            <div
              style={{ width: "95%", display: "flex", flexDirection: "column" }}
            >
              <Typography sx={{ textAlign: "center" }} variant="h5">
                {state?.test.name}
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-warning)",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Poprawne odpowiedzi:{" "}
                {`${state?.summary.correctAnswers}/${state?.summary.numberOfQuestions} - (${state?.summary.percentage}%)`}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ background: "var(--color-dark)", height: "100%" }}>
          {state?.test?.questions.map((question, index) => {
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
                        marginBottom: "1rem",
                      }}
                      variant="h4"
                      component="div"
                    >
                      {`Pytanie ${index + 1}: ${question.question}`}
                    </Typography>

                    {question.possibleAnswers.map((possibleAnswer, index) => {
                      return (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.5rem",
                            color: "var(--color-white)",
                            overflowWrap: "break-word",
                            ...getStylesForCorrectAnswer(
                              question,
                              possibleAnswer
                            ),
                          }}
                          key={index}
                        >
                          <Typography
                            sx={{
                              color: "var(--color-white)",
                              opacity:
                                question.correctAnswer === possibleAnswer.letter
                                  ? "1"
                                  : "0.5",
                              fontWeight: "normal",
                              ...getStylesForCorrectAnswer(
                                question,
                                possibleAnswer
                              ),
                            }}
                          >{`${possibleAnswer.letter}) ${possibleAnswer.answer}`}</Typography>
                          <FormControlLabel
                            label=""
                            sx={{
                              padding: "0",
                              margin: "0",
                            }}
                            checked={
                              question.selectedAnswer === possibleAnswer.letter
                            }
                            control={
                              <Radio
                                sx={{
                                  color:
                                    question.correctAnswer ===
                                      possibleAnswer.letter &&
                                    question.correctAnswer !==
                                      question.selectedAnswer
                                      ? "var(--color-success)"
                                      : "var(--color-white)",
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
      </Dialog>
    </React.Fragment>
  );
}
