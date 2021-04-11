import { Request, Response } from "express";
import { IUserLoginInput, IUserRegisterInput } from "../interfaces/IUser";
import AuthService from "../services/auth";
import pick from "lodash.pick";

const AuthServiceInstance = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  const data: IUserRegisterInput = req.body;

  const { user, jwt, error, errorCode } = await AuthServiceInstance.register(
    data
  );

  if (error && errorCode) return res.status(errorCode).json({ error });

  res.setHeader("Authorization", `Bearer ${jwt}`);

  const returnedUser = pick(user, ["_id", "name", "email"]);

  return res
    .status(201)
    .json({ user: returnedUser, message: "Successfully Registered" });
};

export const loginUser = async (req: Request, res: Response) => {
  const data: IUserLoginInput = req.body;

  const { user, jwt, error, errorCode } = await AuthServiceInstance.login(data);

  if (error && errorCode) return res.status(errorCode).json({ error });

  res.setHeader("Authorization", `Bearer ${jwt}`);

  const returnedUser = pick(user, ["_id", "name", "email"]);

  return res
    .status(200)
    .json({ user: returnedUser, message: "Successfully Logged In" });
};

export const getUser = async (req: Request, res: Response) => {
  return res.json(req.user);
};
