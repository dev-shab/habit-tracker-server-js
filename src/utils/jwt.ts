import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/utils/config.js";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET);
};
