import { Completion } from "@/models/Completion.js";
import { Habit } from "@/models/Habit.js";
import ApiError from "@/utils/ApiError.js";

export const createHabit = async (
  userId: string,
  name: string,
  color?: string,
  order?: number
) => {
  if (!name || name.trim().length === 0) {
    throw new ApiError("Habit Name is Required", 400);
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

export const getHabits = async (userId: string) => {
  const habits = await Habit.find({ userId }).sort({ order: 1 });
  return habits;
};

export const editHabit = async (
  habitId: string,
  userId: string,
  updates: {
    name?: string;
    color?: string;
    order?: number;
  }
) => {
  if (!habitId) {
    throw new ApiError("Habit ID is required", 400);
  }

  const habit = await Habit.findById(habitId);

  if (!habit) {
    throw new ApiError("Habit not found", 404);
  }

  if (habit.userId.toString() !== userId) {
    throw new ApiError("Unauthorised to edit this Habit", 403);
  }

  if (updates.name !== undefined) {
    if (!updates.name || updates.name.length === 0) {
      throw new ApiError("Habit Name cannot be empty", 400);
    }

    const duplicate = await Habit.findOne({
      userId,
      name: updates.name.trim(),
      _id: { $ne: habitId },
    });

    if (duplicate) {
      throw new ApiError("Habit with this name already exists", 409);
    }

    updates.name = updates.name.trim();
  }

  const updatedHabit = await Habit.findByIdAndUpdate(
    habitId,
    { $set: updates },
    { new: true }
  );

  return updatedHabit;
};

export const deleteHabit = async (habitId: string, userId: string) => {
  if (!habitId) {
    throw new ApiError("Habit ID is required", 400);
  }

  const habit = await Habit.findById(habitId);

  if (!habit) {
    throw new ApiError("Habit not found", 404);
  }

  if (habit.userId.toString() !== userId) {
    throw new ApiError("Unauthorised to edit this Habit", 403);
  }

  await Habit.findByIdAndDelete(habitId);
  await Completion.deleteMany({ habitId, userId });

  return;
};
