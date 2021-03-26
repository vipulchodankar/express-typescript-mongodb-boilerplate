import { Router } from "express";
import * as index from "../controllers/index";

const indexRouter = Router();

indexRouter.get("/", index.ping);

export default indexRouter;
