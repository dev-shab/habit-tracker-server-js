import {
  createHabit,
  editHabit,
  getHabits,
} from "@/controllers/habitController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const habitsRouter = Router();

habitsRouter.post("/", authMiddleware, createHabit);
habitsRouter.get("/", authMiddleware, getHabits);
habitsRouter.put("/:id", authMiddleware, editHabit);

export default habitsRouter;
