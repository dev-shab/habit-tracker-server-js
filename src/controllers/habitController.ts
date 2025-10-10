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

export const getHabits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError("Unauthorised", 401);
    }

    const habits = await habitService.getHabits(req.user.id.toString());

    res.status(209).json({
      success: true,
      message: "Habits Fetched Successfully",
      data: habits,
    });
  } catch (error) {
    next(error);
  }
};

export const editHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, color, order } = req.body;

    if (!req.user) {
      throw new ApiError("Unauthorised", 401);
    }

    const updates: { name?: string; color?: string; order?: number } = {};

    if (name !== undefined) updates.name = name;
    if (color !== undefined) updates.color = color;
    if (order !== undefined) updates.order = order;

    const habit = await habitService.editHabit(
      id,
      req.user.id.toString(),
      updates
    );

    res.status(200).json({
      ssuccess: true,
      message: "Habit Updated Successfully",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new ApiError("Unauthorised", 401);
    }

    await habitService.deleteHabit(id, req.user.id.toString());

    res.status(200).json({
      success: true,
      message: "Habit Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
