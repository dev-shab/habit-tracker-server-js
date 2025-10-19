import {
  createHabit,
  deleteHabit,
  editHabit,
  getHabit,
  getHabits,
} from "@/controllers/habitController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const habitsRouter = Router();

habitsRouter.post("/", authMiddleware, createHabit);
habitsRouter.get("/:id", authMiddleware, getHabit);
habitsRouter.get("/", authMiddleware, getHabits);
habitsRouter.put("/:id", authMiddleware, editHabit);
habitsRouter.delete("/:id", authMiddleware, deleteHabit);

export default habitsRouter;
