import express, { type Request, type Response } from "express";
import { MONGODB_CONNECTION_STRING, PORT } from "@/utils/config.js";
import mongoose from "mongoose";
import { setupSwagger } from "./utils/swagger.js";

const app = express();

setupSwagger(app);

if (MONGODB_CONNECTION_STRING) {
  mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to DB");
  });
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Habit Tracker");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
