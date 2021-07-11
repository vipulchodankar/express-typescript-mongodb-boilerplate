import { Router } from "express";
import * as controller from "../controllers/auth";
import validate from "../middleware/validate";
import authSchema from "../schemas/auth";

const authRouter = Router();

authRouter
  .post("/register", validate(authSchema.register), controller.registerUser)
  .post("/login", validate(authSchema.login), controller.loginUser)
  .get("/refresh", controller.refreshToken);

export default authRouter;
