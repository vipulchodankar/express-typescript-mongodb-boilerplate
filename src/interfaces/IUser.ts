import { IUser } from "../models/User";

export interface IUserLoginInput {
  email: IUser["email"];
  password: IUser["password"];
}

export interface IUserRegisterInput extends IUserLoginInput {
  name: IUser["name"];
}
