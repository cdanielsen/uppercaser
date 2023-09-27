import { Request, Response } from "express";
import { uppercaseMessage } from "../../../services/formatString";

export const handlePostMessage = (req: Request, res: Response) => {
  const { message } = req.body;
  const uppercasedMessage = uppercaseMessage(message);
  res.json({
    message: uppercasedMessage,
  });
};
