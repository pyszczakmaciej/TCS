import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
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
    if (state) return;

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

  return (
    <React.Fragment>
      <Dialog scroll="body" fullScreen open={open} onClose={handleClose}>
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
              {state?.test.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ background: "var(--color-dark)" }}>
          {state?.test?.questions.map((question, index) => {
            return (
              <List
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  width: "100%",
                  height: "100%",
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
                            checked={
                              question.selectedAnswer === possibleAnswer.letter
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
                color: "var(--color-blue)",
              }}
            >
              Poprawne odpowiedzi:{" "}
              {`${state?.summary.correctAnswers}/${state?.summary.numberOfQuestions} - poprawność ${state?.summary.percentage}%`}
            </Typography>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
