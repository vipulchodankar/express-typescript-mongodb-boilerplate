import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import express, { Application, ErrorRequestHandler } from "express";
import { connect } from "mongoose";
import { MONGO_OPTIONS, MONGO_URI, PORT } from "./config";
import Logger from "./lib/logger";
// Middleware
import morganMiddleware from "./middleware/morgan";
import authRouter from "./routes/auth";
// Routes
import indexRouter from "./routes/index";
import userRouter from "./routes/user";

connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => Logger.info("MongoDB Connected"))
  .catch((err) => Logger.error(err));

const app: Application = express();

// Middleware
app.use(morganMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(((err, _req, res, _next) => {
  Logger.error(err);
  res.status(500).send("Something went wrong");
}) as ErrorRequestHandler);

app.listen(PORT, () => {
  Logger.info(`Server running at http://localhost:${PORT}`);
});
