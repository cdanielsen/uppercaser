import { Request, Response } from "express";
import { clearInterval } from "timers";

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
  const intervalId = setInterval(sendTime, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};
