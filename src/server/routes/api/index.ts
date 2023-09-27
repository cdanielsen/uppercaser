import { Router } from "express";
import { handlePostMessage } from "./message";
import { handleGetTime } from "./time";

export const api = Router();

api.post("/message", handlePostMessage);
api.get("/time", handleGetTime);
