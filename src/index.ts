import express, { NextFunction, type Request, type Response } from "express";
import { MONGODB_CONNECTION_STRING, PORT } from "@/utils/config.js";
import mongoose from "mongoose";
import { setupSwagger } from "./utils/swagger.js";
import ApiError from "@/utils/ApiError.js";

const app = express();

setupSwagger(app);

app.use(express.json());

if (MONGODB_CONNECTION_STRING) {
  mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to DB");
  });
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Habit Tracker");
});

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
