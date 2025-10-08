import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { MONGODB_CONNECTION_STRING, PORT } from "@/utils/config.js";
import { setupSwagger } from "./utils/swagger.js";
import type ApiError from "@/utils/ApiError.js";
import { BASE_URL } from "@/utils/constants.js";
import userRouter from "@/routes/authRoutes.js";
import habitsRouter from "@/routes/habitsRoutes.js";

const app = express();

setupSwagger(app);

app.use(express.json());
app.use(cookieParser());

if (MONGODB_CONNECTION_STRING) {
  mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to DB");
  });
}

app.use(`${BASE_URL}/auth`, userRouter);
app.use(`${BASE_URL}/habits`, habitsRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
