import { Router } from "express";
import * as auth from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", auth.registerUser);

export default authRouter;
