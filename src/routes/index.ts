import { Router } from "express";
import * as controler from "../controllers";

const indexRouter = Router();

indexRouter.get("/", controler.ping);

export default indexRouter;
