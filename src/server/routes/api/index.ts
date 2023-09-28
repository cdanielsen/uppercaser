import { Router } from "express";
import {
  validatePostMessage,
  handlePostMessage,
  postMessageRequestSchema,
} from "./message";
import { handleGetTime } from "./time";

export const api = Router();

api.post(
  "/message",
  validatePostMessage(postMessageRequestSchema),
  handlePostMessage,
);
api.get("/time", handleGetTime);
