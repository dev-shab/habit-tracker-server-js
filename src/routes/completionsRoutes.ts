import { createCompletion } from "@/controllers/completionController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const completionsRouter = Router();

completionsRouter.post("/", authMiddleware, createCompletion);

export default completionsRouter;
