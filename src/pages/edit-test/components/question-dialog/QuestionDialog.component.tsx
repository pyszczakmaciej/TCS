import { RemoveCircleOutline } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import TestsService from "../../../../backend/tests/Tests.service";
import { AnswerLetter } from "../../../../backend/tests/models/answer-letter.type";
import { Answer } from "../../../../backend/tests/models/answer.interface";
import { QuestionPayload } from "../../../../backend/tests/models/question-payload.interface";
import AppState from "../../../../store/App.state";
import "./QuestionDialog.component.css";

export interface IQuestionDialogProps {
  open: boolean;
  onClose: (reload: boolean) => void;
  testUuid: string;
}

const textFieldSx = {
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 0,
    backgroundColor: "var(--color-white)",
    border: "1px solid",
    borderColor: "var(--color-secondary)",
    color: "var(--color-dark)",

    "&:hover": {
      backgroundColor: "var(--color-white)",
      color: "var(--color-dark)",
    },
    "&.Mui-focused": {
      backgroundColor: "var(--color-white)",

      borderColor: "var(--color-primary)",
    },
  },
};

const lettersMap: Record<number, AnswerLetter> = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
};

export function QuestionDialog(props: IQuestionDialogProps) {
  const { onClose, open, testUuid } = props;

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<AnswerLetter>("A");

  const [formValues, setFormValues] = useState<QuestionPayload>({
    correctAnswer: "A",
    possibleAnswers: [],
    question: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    console.log(e.target.name, e.target.value);

    if (e.target.name.length === 1) {
      setAnswers(
        answers.map((answer) => {
          if (answer.letter === e.target.name) {
            return {
              letter: e.target.name,
              answer: e.target.value,
            };
          } else {
            return answer;
          }
        })
      );
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
    console.log(formValues);
  };

  const question = AppState.getValue("questionToEdit");

  useEffect(() => {
    if (question) {
      const toEdit: Answer[] = question.possibleAnswers.map((item) => {
        return {
          letter: item.letter,
          answer: item.answer,
        };
      });

      setFormValues({
        ...formValues,
        question: question.question,
        correctAnswer: question.correctAnswer,
      });
      setAnswers(toEdit);
    }
  }, [question]);

  const addAnswer = () => {
    if (answers.length > 5) return;

    setAnswers([
      ...answers,
      {
        answer: "",
        letter: lettersMap[answers.length],
      },
    ]);

    console.log(question);
  };

  const removeAnswer = (letter: AnswerLetter) => {
    if (!answers) return;

    const newAnswers: Answer[] = answers.filter(
      (item) => item.letter !== letter
    );

    setAnswers(
      newAnswers.map((item, index) => {
        return {
          letter: lettersMap[index],
          answer: item.answer,
        };
      })
    );

    if (letter === correctAnswer) {
      console.log(letter, formValues.correctAnswer);
      setCorrectAnswer("A");
    }
  };

  const handleClose = (reload: boolean) => {
    onClose(reload);
    setAnswers([]);
  };

  const save = async () => {
    if (!answers.length) return;

    question
      ? TestsService.updateQuestion(testUuid, question.uuid, {
          correctAnswer,
          possibleAnswers: answers,
          question: formValues.question,
        }).then(() => {
          handleClose(true);
        })
      : TestsService.createQuestion(testUuid, {
          correctAnswer,
          possibleAnswers: answers,
          question: formValues.question,
        }).then(() => {
          handleClose(true);
        });
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose}>
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
              edge="start"
              onClick={() => handleClose(false)}
              aria-label="close"
            >
              <CloseIcon sx={{ color: "var(--color-white)" }} />
            </IconButton>
            <Typography>
              {question
                ? `Edycja pytania: ${formValues.question}`
                : "Tworzenie pytania"}{" "}
            </Typography>
            <Button
              autoFocus
              variant="contained"
              sx={{
                minWidth: 120,
                padding: "0.5rem",
                background: "var(--color-blue)",
                ":hover": { background: "var(--color-success)" },
              }}
              onClick={save}
            >
              Zapisz
            </Button>
          </Toolbar>
        </AppBar>

        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "2rem 3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "var(--color-dark)",
          }}
          className="dialog-answers"
        >
          <TextField
            onChange={(e) => handleInputChange(e)}
            name="question"
            label="Treść pytania"
            value={formValues.question}
            variant="filled"
            sx={textFieldSx}
          />
          {answers.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  width: "90%",
                  alignItems: "center",
                  gap: "1rem",
                  color: "var(--color-white)",
                }}
                className="dialog-answers__answer"
              >
                <Typography>Odp: {item.letter}</Typography>
                <TextField
                  variant="filled"
                  label={`Odp: ${item.letter}`}
                  sx={{ ...textFieldSx }}
                  required={true}
                  onChange={(e) => handleInputChange(e)}
                  name={item.letter}
                  value={item.answer}
                />
                <FormControlLabel
                  sx={{
                    color:
                      item.letter === correctAnswer
                        ? "var(--color-success)"
                        : null,
                  }}
                  checked={item.letter === correctAnswer}
                  onChange={() => setCorrectAnswer(item.letter)}
                  control={
                    <Radio
                      sx={{
                        color: "var(--color-white)",
                        "&.Mui-checked": {
                          color: "var(--color-success)",
                        },
                      }}
                    />
                  }
                  label="Poprawna"
                />
                <IconButton
                  key={index}
                  onClick={() => removeAnswer(item.letter)}
                >
                  <RemoveCircleOutline sx={{ color: "var(--color-error)" }} />
                </IconButton>
              </div>
            );
          })}
          {answers.length <= 5 ? (
            <Button
              onClick={addAnswer}
              variant="contained"
              sx={{
                width: "50%",
                padding: "1rem",
                background: "var(--color-blue)",
                ":hover": { background: "var(--color-success)" },
              }}
            >
              Dodaj odpowiedź
            </Button>
          ) : (
            <p>Osiągnięto limit odpowiedzi.</p>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  );
}
