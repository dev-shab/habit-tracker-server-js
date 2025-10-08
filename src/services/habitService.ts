import { Habit } from "@/models/Habit.js";
import ApiError from "@/utils/ApiError.js";

export const createHabit = async (
  userId: string,
  name: string,
  color?: string,
  order?: number
) => {
  if (!name || name.trim().length === 0) {
    throw new ApiError("Habit Name is Required", 409);
  }

  const existing = await Habit.findOne({ userId, name: name.trim() });
  if (existing) {
    throw new ApiError("Duplicate Habit Name", 409);
  }

  if (order === undefined) {
    const lastHabit = await Habit.findOne({ userId })
      .sort({ order: -1 })
      .select("order");
    order = lastHabit?.order ? lastHabit.order + 1 : 1;
  }

  const habit = await Habit.create({ userId, name, color, order });
  return habit;
};
