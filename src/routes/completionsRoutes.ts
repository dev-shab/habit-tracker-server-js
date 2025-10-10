import {
  createCompletion,
  deleteCompletion,
  getCompletionsByHabit,
} from "@/controllers/completionController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const completionsRouter = Router();

completionsRouter.post("/", authMiddleware, createCompletion);
completionsRouter.get("/habit/:habitId", authMiddleware, getCompletionsByHabit);
completionsRouter.delete("/:habitId/:date", authMiddleware, deleteCompletion);

export default completionsRouter;
