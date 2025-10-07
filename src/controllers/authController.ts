import { loginUser, signupUser } from "@/services/authService.js";
import { NextFunction, Request, Response } from "express";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await signupUser(name, email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
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
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(201).json({
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
