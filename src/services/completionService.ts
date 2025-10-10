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

  const completion = await Completion.create({
    habitId,
    userId,
    date: completionDate,
  });

  return completion;
};
