import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {
  ITokenData,
  IUserLoginInput,
  IUserRegisterInput,
} from "../interfaces/IUser";
import AuthService from "../services/auth";
import pick from "lodash.pick";
import { addAuthToRes } from "../utils/auth";
import { REFRESH_TOKEN_SECRET } from "../config";

const AuthServiceInstance = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  const data: IUserRegisterInput = req.body;

  const { user, accessToken, refreshToken, error, errorCode } =
    await AuthServiceInstance.register(data);

  if (error && errorCode) return res.status(errorCode).json({ error });

  if (accessToken && refreshToken) addAuthToRes(res, accessToken, refreshToken);

  const returnedUser = pick(user, ["_id", "name", "email"]);

  return res
    .status(201)
    .json({ user: returnedUser, message: "Successfully Registered" });
};

export const loginUser = async (req: Request, res: Response) => {
  const data: IUserLoginInput = req.body;

  const { user, accessToken, refreshToken, error, errorCode } =
    await AuthServiceInstance.login(data);

  if (error && errorCode) return res.status(errorCode).json({ error });

  if (accessToken && refreshToken) addAuthToRes(res, accessToken, refreshToken);

  const returnedUser = pick(user, ["_id", "name", "email"]);

  return res
    .status(200)
    .json({ user: returnedUser, message: "Successfully Logged In" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ error: "Not Authenticated" });

  //TODO: Check if refresh token is in cache/db

  try {
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as ITokenData;

    AuthServiceInstance.generateAccessToken({ _id: decoded._id });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  return res.status(200).json({ message: "Access Token Refreshed" });
};
