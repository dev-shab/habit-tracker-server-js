import { signUp, login, logout } from "@/controllers/authController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
