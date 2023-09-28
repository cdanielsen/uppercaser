import { ChangeEventHandler, InvalidEvent, useState } from "react";
import { sendMessage, MessageResponse } from "../api";
import {
  ALPHA_ONLY,
  ALPHA_ONLY_ERROR_MESSAGE,
} from "../../../shared/constants";

import "./MessageForm.css";

interface MessageFormProps {
  onSubmitError: (error: unknown) => void;
  onResponse: (response: MessageResponse) => void;
}

const MessageForm = ({
  onResponse: onSubmit,
  onSubmitError,
}: MessageFormProps) => {
  const [inputText, setInputText] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const inputId = "uppercaser-request-field";

  const handleInvalidInput = (e: InvalidEvent<HTMLInputElement>) => {
    const { patternMismatch, valueMissing } = e.target.validity;
    if (!valueMissing && patternMismatch) {
      return e.target.setCustomValidity(ALPHA_ONLY_ERROR_MESSAGE);
    }
    return e.target.setCustomValidity("");
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsFormValid(e.target.checkValidity());
    const nextValue = e.target.value;

    setInputText(nextValue);
  };

  const handleSubmitText = (message: string) => () => {
    (async () => {
      if (!isFormValid) {
        return;
      }
      try {
        const response = await sendMessage(message);
        onSubmit(response);
      } catch (e) {
        console.error(e);
        onSubmitError(e);
      }
    })();
  };

  return (
    <form
      className="UppercaseForm"
      name="Uppercasing test submission form"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="UppercaseForm__TextInput"
        type="text"
        required
        minLength={1}
        maxLength={20}
        pattern={ALPHA_ONLY.source}
        id={inputId}
        name={inputId}
        value={inputText}
        aria-label="Text to uppercase"
        onInvalid={handleInvalidInput}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmitText(inputText)}>
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
