import { useState } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import { MessageResponse } from "./api";

function App() {
  const [responseText, setResponseText] = useState("");
  const [hasError, setError] = useState(false);

  const handleSubmit = ({ message }: MessageResponse) => {
    setError(false);
    setResponseText(message);
  };

  const handleError = (e: unknown) => {
    console.error(e);
    setError(true);
  };

  return (
    <>
      <header>
        <h1>UpperCaser</h1>
      </header>
      <main id="Content">
        <MessageForm onSubmitError={handleError} onResponse={handleSubmit} />
        <h3 aria-label="Submission result">
          {hasError ? "An error occurred. Please try again" : responseText}
        </h3>
      </main>
    </>
  );
}

export default App;
