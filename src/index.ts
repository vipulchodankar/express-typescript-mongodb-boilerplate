import express, { Application } from "express";
import Logger from "./lib/logger";
import { MONGO_URI, PORT } from "./config";
import { connect } from "mongoose";

// Middleware
import morganMiddleware from "./middleware/morgan";
import { json, urlencoded } from "body-parser";

// Routes
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => Logger.info("MongoDB Connected"))
  .catch((err) => Logger.error(err));

const app: Application = express();

// Middleware
app.use(morganMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  Logger.info(`Server running at http://localhost:${PORT}`);
});
