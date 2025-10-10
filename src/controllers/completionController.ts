import { type Request, type Response, type NextFunction } from "express";
import * as completionService from "@/services/completionService.js";

export const createCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { habitId, date } = req.body;

    const completion = await completionService.createCompletion(
      habitId,
      req.user!.id.toString(),
      date
    );

    res.status(201).json({
      success: true,
      message: "Habit marked complete successfully",
      data: completion,
    });
  } catch (error) {
    next(error);
  }
};
