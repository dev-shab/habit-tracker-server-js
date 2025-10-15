import { loggedInUser, loginUser, signupUser } from "@/services/authService.js";
import { getCookieOptions } from "@/utils/cookieOptions.js";
import { type NextFunction, type Request, type Response } from "express";

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = await loggedInUser(req.user!.id);
    res.status(201).json({
      success: true,
      message: "Current User fetched Successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await signupUser(name, email, password);
    res.cookie("token", token, getCookieOptions());
    res.status(201).json({
      success: true,
      message: "User Signed Up Successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, getCookieOptions());
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax" as const,
  });
  res.status(200).json({
    success: true,
    message: "User Logged out successfully",
  });
};
