import { Request, Response } from "express";
import { clearInterval } from "timers";

// TODO: This should probably be an env variable
const TIME_UPDATE_INTERVAL = 60000;

export const handleGetTime = (req: Request, res: Response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const sendTime = () => {
    const currentTime = Date.now();
    res.write(`data: ${currentTime}\n\n`);
  };

  // Send immediately on fresh connection
  sendTime();
  // Send an update on a regular interval
  const intervalId = setInterval(sendTime, TIME_UPDATE_INTERVAL);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};
