import { compare, genSalt, hash } from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  SALT_ROUNDS,
} from "../config";
import { IUserLoginInput, IUserRegisterInput } from "../interfaces/IUser";
import Logger from "../lib/logger";
import { IUser } from "../models/User";
import UserService from "./user";

const UserServiceInstance = new UserService();
export default class AuthService {
  constructor() {}

  generateAccessToken(user: IUser) {
    const data = {
      _id: user._id,
    };

    return jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
  }

  private generateRefreshToken(user: IUser) {
    const data = {
      _id: user._id,
    };

    return jwt.sign(data, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  }

  async register(data: IUserRegisterInput) {
    try {
      const { name, email, password } = data;

      const { user: foundUser } = await UserServiceInstance.findOne({
        email,
      });

      if (foundUser)
        return { error: "User with this email already exists", errorCode: 409 };

      const salt = await genSalt(SALT_ROUNDS);
      const hashedPassword = await hash(password, salt);

      const { user, error, errorCode } = await UserServiceInstance.create({
        name,
        email,
        password: hashedPassword,
      });

      if (error && errorCode) return { error, errorCode };

      if (!user) throw new Error("No user");

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return { user, accessToken, refreshToken };
    } catch (error) {
      Logger.error(error);
      return { error: error.message, errorCode: 500 };
    }
  }

  async login(data: IUserLoginInput) {
    try {
      const { email, password } = data;

      const { user, error, errorCode } = await UserServiceInstance.findOne({
        email,
      });

      if (error && errorCode) return { error, errorCode };

      if (!user) throw new Error("No user");

      const result = await compare(password, user.password);

      if (!result)
        return { error: "Invalid email or password", errorCode: 400 };

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return { user, accessToken, refreshToken };
    } catch (error) {
      Logger.error(error);
      return { error: error.message, errorCode: 500 };
    }
  }
}
