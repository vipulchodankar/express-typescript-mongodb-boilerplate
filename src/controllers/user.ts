import { Request, Response } from "express";
import { IUser } from "../models/User";
import userSchema from "../schemas/user";
import UserService from "../services/user";

const UserServiceInstance = new UserService();

export const getUser = async (req: Request, res: Response) => {
  return res.status(200).json(req.user);
};

export const updateUser = async (req: Request, res: Response) => {
  const data: Partial<IUser> = req.body;

  // Don't allow updating other fields
  const allowedData = userSchema.update.noUnknown().cast(data);

  const { user, error, errorCode } = await UserServiceInstance.update(
    req.user?._id,
    allowedData
  );

  if (error && errorCode) return res.status(errorCode).json({ error });

  return res.status(200).json({ user, message: "Successfully updated user" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { error, errorCode } = await UserServiceInstance.delete(req.user?._id);

  if (error && errorCode) return res.status(errorCode).json({ error });

  return res.status(200).json({ message: "Successfully deleted user" });
};
