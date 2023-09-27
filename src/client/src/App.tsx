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
      <main id="Main">
        <label htmlFor={inputId}>Text to Uppercase</label>
        <input
          id={inputId}
          type="text"
          value={inputText}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmitText(inputText)}>
          Submit
        </button>
        <section>
          <div>
            The server replied:{" "}
            {isError ? "An error occurred. Please try again" : responseText}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
