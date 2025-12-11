import express from "express";
import connectDB from "./config/db.js";
import HANDLERS from "./handlers/index.js";
import errorMiddleware from "./middlewares/error.js";
import { authMiddleware } from "./middlewares/auth.js";

const APP_SERVER = express();
const PORT = process.env.PORT;
connectDB()
  .then(() => {})
  .catch(() => {});

APP_SERVER.get("/", (req, res) => {
  res.send("Welcome to Wander Wise API");
});
APP_SERVER.use(express.json());
APP_SERVER.use(authMiddleware);
APP_SERVER.use("/", HANDLERS);
APP_SERVER.use(errorMiddleware);

APP_SERVER.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
