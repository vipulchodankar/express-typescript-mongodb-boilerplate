import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";
import { ITokenData } from "../interfaces/IUser";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ message: "Not Authenticated" });

  const token = authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as ITokenData;

    req.userId = decoded._id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export default isAuth;
