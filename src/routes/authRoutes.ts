import {
  signUp,
  login,
  logout,
  currentUser,
} from "@/controllers/authController.js";
import { authMiddleware } from "@/middlewares/authMiddleware.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/me", authMiddleware, currentUser);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
