import { Schema, model } from "mongoose";

const habitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  }
);

habitSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Habit = model("Habit", habitSchema);
