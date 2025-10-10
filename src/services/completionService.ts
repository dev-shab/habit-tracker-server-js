import { Completion } from "@/models/Completion.js";
import { Habit } from "@/models/Habit.js";
import ApiError from "@/utils/ApiError.js";

export const createCompletion = async (
  habitId: string,
  userId: string,
  date: string
) => {
  if (!habitId) {
    throw new ApiError("Habit ID is required", 400);
  }

  if (!date) {
    throw new ApiError("Date is required", 400);
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new ApiError("Invalid date format. Use YYYY-MM-DD", 400);
  }

  const habit = await Habit.findById(habitId);
  if (!habit) {
    throw new ApiError("Habit not found", 404);
  }

  if (habit.userId.toString() !== userId) {
    throw new ApiError("Unauthorised to mark this habit", 403);
  }

  const completionDate = new Date(date);
  completionDate.setUTCHours(0, 0, 0, 0);

  if (isNaN(completionDate.getTime())) {
    throw new ApiError("Invalid Date", 400);
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (completionDate > today) {
    throw new ApiError("Cannot mark habits complete in the future", 400);
  }

  const completion = await Completion.create({
    habitId,
    userId,
    date: completionDate,
  });

  return completion;
};

export const getCompletionsByHabit = async (
  habitId: string,
  userId: string,
  startDate?: string,
  endDate?: string
) => {
  if (!habitId) {
    throw new ApiError("Habit ID is required", 400);
  }

  const habit = await Habit.findById(habitId);

  if (!habit) {
    throw new ApiError("Habit not found", 404);
  }

  if (habit.userId.toString() !== userId) {
    throw new ApiError("Unauthorized to view this habit's completions", 403);
  }

  const query: {
    habitId: string;
    date?: {
      $gte?: Date;
      $lte?: Date;
    };
  } = { habitId };

  if (startDate || endDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    query.date = {};

    if (startDate) {
      if (!dateRegex.test(startDate)) {
        throw new ApiError("Invalid startDate format. Use YYYY-MM-DD", 400);
      }

      const start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0);

      if (isNaN(start.getTime())) {
        throw new ApiError("Invalid startDate", 400);
      }

      query.date.$gte = start;
    }

    if (endDate) {
      if (!dateRegex.test(endDate)) {
        throw new ApiError("Invalid endDate format. Use YYYY-MM-DD", 400);
      }

      const start = new Date(endDate);
      start.setUTCHours(0, 0, 0, 0);

      if (isNaN(start.getTime())) {
        throw new ApiError("Invalid endDate", 400);
      }

      query.date.$lte = start;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        throw new ApiError("startDate must be before endDate", 400);
      }
    }
  }

  const completions = await Completion.find(query).sort({ date: -1 });

  return completions;
};

export const deleteCompletion = async (
  habitId: string,
  userId: string,
  date: string
) => {
  if (!habitId) {
    throw new ApiError("Habit ID is required", 400);
  }

  if (!date) {
    throw new ApiError("Date is required", 400);
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new ApiError("Invalid date format. Use YYYY-MM-DD", 400);
  }

  const habit = await Habit.findById(habitId);

  if (!habit) {
    throw new ApiError("Habit not found", 404);
  }

  if (habit.userId.toString() !== userId) {
    throw new ApiError("Unauthorized to delete this habit's completions", 403);
  }

  const completionDate = new Date(date);
  completionDate.setUTCHours(0, 0, 0, 0);

  if (isNaN(completionDate.getTime())) {
    throw new ApiError("Invalid date", 400);
  }

  const completion = await Completion.findOneAndDelete({
    habitId,
    userId,
    date: completionDate,
  });

  if (!completion) {
    throw new ApiError("Completion not found for this date", 404);
  }

  return;
};
