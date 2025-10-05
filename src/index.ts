import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Habit Tracker");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

console.log("Welcome to habit tracker");
