import { type Request, type Response, type NextFunction } from "express";
import * as habitService from "@/services/habitService.js";
import ApiError from "@/utils/ApiError.js";

export const createHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, color, order } = req.body;

    if (!req.user) {
      throw new ApiError("Unauthorised", 401);
    }

    const habit = await habitService.createHabit(
      req.user.id.toString(),
      name,
      color,
      order
    );

    res.status(201).json({
      success: true,
      message: "Habit Created Successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};
