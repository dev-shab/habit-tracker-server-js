import { signUp, login } from "@/controllers/authController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

export default userRouter;
