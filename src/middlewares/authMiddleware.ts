import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import ApiError from "@/utils/ApiError.js";
import { JWT_SECRET } from "@/utils/config.js";
import { type UserPayload } from "@/types/express.d.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError("Not Authenticated", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as UserPayload;
    next();
  } catch (error) {
    console.error(error);
    throw new ApiError("Invalid or Expired Tokens", 401);
  }
};
