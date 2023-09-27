import { ChangeEventHandler, useState } from "react";
import "./App.css";
import { sendMessage } from "./api";

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isError, setIsError] = useState(false);

  const inputId = "uppercaser-request-field";

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const nextValue = e.target.value;
    setInputText(nextValue);
  };

  const handleSubmitText = (message: string) => () => {
    (async () => {
      try {
        setIsError(false);
        const response = await sendMessage(message);
        setResponseText(response.message);
      } catch (e) {
        setIsError(true);
        setResponseText("");
      }
    })();
  };

  return (
    <>
      <header>
        <h1>UpperCaser</h1>
      </header>
      <main id="Content">
        <form
          id="Content__UppercaseForm"
          name="Uppercasing test submission form"
          target="_self"
        >
          <input
            type="text"
            id={inputId}
            name={inputId}
            value={inputText}
            aria-label="Text to uppercase"
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleSubmitText(inputText)}>
            Submit
          </button>
        </form>
        <h3 aria-label="Submission result">
          {isError ? "An error occurred. Please try again" : responseText}
        </h3>
      </main>
    </>
  );
}

export default App;
