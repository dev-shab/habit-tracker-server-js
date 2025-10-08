import bcrypt from "bcrypt";
import { User } from "@/models/User.js";
import ApiError from "@/utils/ApiError.js";
import { generateToken } from "@/utils/jwt.js";

export const signupUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError("User already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
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
