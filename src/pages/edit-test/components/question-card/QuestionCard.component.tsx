import { QuestionResponse } from "../../../../backend/tests/models/question-response.interface";
import "./QuestionCard.component.css";
export interface IQuestionCardProps {
  question: QuestionResponse;
  handleEdit: (question: QuestionResponse) => void;
}

export function QuestionCard(props: IQuestionCardProps) {
  const { question, handleEdit } = props;
  return (
    <div className="question-card">
      <p className="question-card__title">{question.question}</p>
      <div className="question-card__answers">
        {question.possibleAnswers.map((item, index) => {
          return (
            <p
              key={index}
              className={
                item.letter === question.correctAnswer
                  ? "question-card__answers--correct"
                  : ""
              }
            >
              {item.letter}: {item.answer}
            </p>
          );
        })}
        <button onClick={() => handleEdit(question)}>Edytuj</button>
      </div>
    </div>
  );
}
