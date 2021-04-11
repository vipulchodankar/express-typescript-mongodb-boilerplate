import { IUser } from "../models/User";

export interface IUserLoginInput {
  email: IUser["email"];
  password: IUser["password"];
}

export interface IUserRegisterInput extends IUserLoginInput {
  name: IUser["name"];
}

export interface ITokenData {
  _id: IUser["_id"];
  iat: string;
  exp: string;
}
