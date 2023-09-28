import { useEffect, useState } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import { MessageResponse } from "./api";

function App() {
  const [responseText, setResponseText] = useState("");
  const [hasError, setError] = useState(false);
  const [lastServerSentTime, setLastServerSentTime] = useState(Date.now());

  useEffect(() => {
    const eventSource = new EventSource("/api/time");
    // Update time on new message from server
    eventSource.onmessage = function (event: { data: string }) {
      setLastServerSentTime(parseInt(event.data));
    };
    // Handle errors
    eventSource.onerror = function (error) {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    // Close the connection on unmount
    return () => {
      eventSource.close();
    };
  }, []);

  const handleSubmit = ({ message }: MessageResponse) => {
    setError(false);
    setResponseText(message);
  };

  const handleError = (e: unknown) => {
    console.error(e);
    setError(true);
  };

  const generateHumanTime = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp);

    // Extract hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Return the result as an object
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <header>
        <h1>UpperCaser</h1>
      </header>
      <main className="Content">
        <MessageForm onSubmitError={handleError} onResponse={handleSubmit} />
        <h3 aria-label="Submission result">
          {hasError ? "An error occurred. Please try again" : responseText}
        </h3>
        <h3 className="Content__TimeDisplay">
          Current Time: {generateHumanTime(lastServerSentTime)}
        </h3>
      </main>
    </>
  );
}

export default App;
