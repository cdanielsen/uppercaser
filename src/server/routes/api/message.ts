import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { uppercaseMessage } from "../../../services/formatString";
import {
  ALPHA_ONLY,
  ALPHA_ONLY_ERROR_MESSAGE,
} from "../../../shared/constants";

export const postMessageRequestSchema = z.object({
  body: z.object({
    message: z
      .string({
        required_error: "Message is required",
      })
      .min(1, "Message cannot be empty")
      .regex(ALPHA_ONLY, ALPHA_ONLY_ERROR_MESSAGE),
  }),
});

export const validatePostMessage =
  (schema: typeof postMessageRequestSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export const handlePostMessage = (req: Request, res: Response) => {
  const { message } = req.body;
  const uppercasedMessage = uppercaseMessage(message);
  res.json({
    message: uppercasedMessage,
  });
};
