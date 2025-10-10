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

export const getCompletionsByHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { habitId } = req.params;
    const { startDate, endDate } = req.query;

    const completions = await completionService.getCompletionsByHabit(
      habitId,
      req.user!.id.toString(),
      startDate as string | undefined,
      endDate as string | undefined
    );

    res.status(200).json({
      success: true,
      message: "Completions fetched successfully",
      data: completions,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { habitId, date } = req.params;

    await completionService.deleteCompletion(
      habitId,
      req.user!.id.toString(),
      date
    );

    res.status(200).json({
      success: true,
      message: "Habit unmarked successfully",
    });
  } catch (error) {
    next(error);
  }
};
