import { ChangeEventHandler, useState } from "react";
import { sendMessage, MessageResponse } from "../api";

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

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsFormValid(e.target.checkValidity());
    const nextValue = e.target.value;

    setInputText(nextValue);
  };

  const handleSubmitText = (message: string) => () => {
    (async () => {
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
    <form id="Content__UppercaseForm" name="Uppercasing test submission form">
      <input
        type="text"
        required
        minLength={1}
        maxLength={20}
        id={inputId}
        name={inputId}
        value={inputText}
        aria-label="Text to uppercase"
        onChange={handleInputChange}
      />
      <button
        type="button"
        disabled={!isFormValid}
        onClick={handleSubmitText(inputText)}
      >
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
