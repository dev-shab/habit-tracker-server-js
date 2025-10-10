import { Schema, model } from "mongoose";

const completionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    habitId: {
      type: Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

completionSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });

export const Completion = model("Completion", completionSchema);
