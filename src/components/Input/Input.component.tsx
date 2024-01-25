import { useState } from "react";
import "./Input.component.css";

const inputErrorMessageMap: { [K in keyof ValidityState]: string } = {
  ["badInput"]: "",
  ["customError"]: "",
  ["patternMismatch"]: "",
  ["rangeOverflow"]: "",
  ["rangeUnderflow"]: "",
  ["stepMismatch"]: "",
  ["tooLong"]: "",
  ["tooShort"]: "",
  ["typeMismatch"]: "",
  ["valid"]: "",
  ["valueMissing"]: "To pole jest wymagane.",
};

function Input(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const [error, setError] = useState<string | null>(null);

  const checkValidity = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const validity = e.target.validity;

    if (validity.valueMissing) {
      setError(inputErrorMessageMap["valueMissing"]);
    }
  };

  return (
    <div className="input-box">
      <input
        onBlur={(e) => checkValidity(e)}
        className="input-field"
        {...props}
      />
      {error ? <span className="input-field-error">{error}</span> : null}
    </div>
  );
}

export default Input;
