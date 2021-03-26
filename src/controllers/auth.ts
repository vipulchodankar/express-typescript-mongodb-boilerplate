import { Request, Response } from "express";
import { IUserRegisterInput } from "../interfaces/IUser";
import AuthService from "../services/auth";

const AuthServiceInstance = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  const data: IUserRegisterInput = req.body;

  const result = await AuthServiceInstance.register(data);

  return res.json(result);
};
