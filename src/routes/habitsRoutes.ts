import { createHabit, getHabits } from "@/controllers/habitController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const habitsRouter = Router();

habitsRouter.post("/", authMiddleware, createHabit);
habitsRouter.get("/", authMiddleware, getHabits);

export default habitsRouter;
