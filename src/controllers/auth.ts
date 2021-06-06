import { Request, Response } from "express";
import { IUserLoginInput, IUserRegisterInput } from "../interfaces/IUser";
import AuthService from "../services/auth";
import pick from "lodash.pick";
import { addAuthToRes } from "../utils/auth";

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
