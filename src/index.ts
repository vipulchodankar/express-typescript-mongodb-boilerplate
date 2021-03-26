import express, { Application } from "express";
import Logger from "./lib/logger";
import dotenv from "dotenv";
import { PORT } from "./config/server";

// Middleware
import morganMiddleware from "./middleware/morgan";
import { json, urlencoded } from "body-parser";

// Routes
import indexRouter from "./routes/index";

dotenv.config();

const app: Application = express();

// Middleware
app.use(morganMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);

app.listen(PORT, () => {
  Logger.info(`Server running at http://localhost:${PORT}`);
});
