import { Router } from "express";
import * as auth from "../controllers/auth";
import isAuth from "../middleware/isAuth";

const authRouter = Router();

authRouter.post("/register", auth.registerUser);
authRouter.post("/login", auth.loginUser);
authRouter.get("/", isAuth, auth.getUser);

export default authRouter;
