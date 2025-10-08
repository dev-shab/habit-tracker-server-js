import { createHabit } from "@/controllers/habitController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const habitsRouter = Router();

habitsRouter.post("/", authMiddleware, createHabit);

export default habitsRouter;
