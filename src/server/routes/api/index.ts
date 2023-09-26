import { Router } from "express";
import { uppercaseMessage } from "../../../services/formatString";

export const api = Router();

api.post("/message", (req, res) => {
  const { message } = req.body;
  const uppercasedMessage = uppercaseMessage(message);
  res.json({
    message: uppercasedMessage,
  });
});
