import {
  createCompletion,
  getCompletionsByHabit,
} from "@/controllers/completionController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const completionsRouter = Router();

completionsRouter.post("/", authMiddleware, createCompletion);
completionsRouter.get("/habit/:habitId", authMiddleware, getCompletionsByHabit);

export default completionsRouter;
