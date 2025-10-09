import bcrypt from "bcrypt";
import { User } from "@/models/User.js";
import ApiError from "@/utils/ApiError.js";
import { generateToken } from "@/utils/jwt.js";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  if (!name || name.trim().length === 0) {
    throw new ApiError("User Name is Required", 400);
  }

  if (!email || email.trim().length === 0) {
    throw new ApiError("User Email is Required", 400);
  }

  const existing = await User.findOne({ email: email.trim() });
  if (existing) {
    throw new ApiError("User already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: email.trim(),
    passwordHash,
  });

  const token = generateToken(user._id.toString());

  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (!existing) {
    throw new ApiError("User already exists", 409);
  }

  const isPasswordValid = await bcrypt.compare(password, existing.passwordHash);
  if (!isPasswordValid) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = generateToken(existing._id.toString());

  return { user: existing, token };
};
