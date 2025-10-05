import express, { type Request, type Response } from "express";
import { PORT } from "@/utils/config.js";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Habit Tracker");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

console.log("Welcome to habit tracker");
