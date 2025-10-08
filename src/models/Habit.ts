import { Schema, model } from "mongoose";

const habitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    order: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const Habit = model("Habit", habitSchema);
