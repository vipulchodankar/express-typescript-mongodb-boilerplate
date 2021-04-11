import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SIGNATURE } from "../config";
import { ITokenData } from "../interfaces/IUser";
import UserService from "../services/user";

const UserServiceInstance = new UserService();

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ message: "Not Authenticated" });

  const token = authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SIGNATURE) as ITokenData;

    const { user, error, errorCode } = await UserServiceInstance.findById(
      decoded._id
    );

    if (error && errorCode) return res.status(errorCode).json({ error });

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export default isAuth;
