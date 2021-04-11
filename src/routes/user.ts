import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as controller from "../controllers/user";
import validate from "../middleware/validate";
import userSchema from "../schemas/user";

const userRouter = Router();

userRouter
  .get("/", isAuth, controller.getUser)
  .put("/", isAuth, validate(userSchema.update), controller.updateUser)
  .delete("/", isAuth, controller.deleteUser);

export default userRouter;
