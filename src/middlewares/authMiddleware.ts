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
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError("Authentication required", 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("Invalid token", 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError("Token expired", 401));
    }
    next(error);
  }
};
