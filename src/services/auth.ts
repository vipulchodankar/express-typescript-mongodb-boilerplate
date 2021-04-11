import { compare, genSalt, hash } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SIGNATURE, SALT_ROUNDS } from "../config";
import { IUserLoginInput, IUserRegisterInput } from "../interfaces/IUser";
import Logger from "../lib/logger";
import { IUser } from "../models/User";
import UserService from "./user";

const UserServiceInstance = new UserService();
export default class AuthService {
  constructor() {}

  private generateToken(user: IUser) {
    const data = {
      _id: user._id,
    };

    return jwt.sign(data, JWT_SIGNATURE, { expiresIn: JWT_EXPIRATION });
  }

  public async register(data: IUserRegisterInput) {
    try {
      const { name, email, password } = data;

      const { user: foundUser } = await UserServiceInstance.findOne({
        email,
      });

      if (foundUser)
        return { error: "User with this email already exists", errorCode: 404 };

      const salt = await genSalt(SALT_ROUNDS);
      const hashedPassword = await hash(password, salt);

      const { user, error, errorCode } = await UserServiceInstance.create({
        name,
        email,
        password: hashedPassword,
      });

      if (error && errorCode) return { error, errorCode };

      if (!user) throw new Error("No user");

      const jwt = this.generateToken(user);

      return { user, jwt };
    } catch (error) {
      Logger.error(error);
      return { error: error.message, errorCode: 500 };
    }
  }

  public async login(data: IUserLoginInput) {
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

      const jwt = this.generateToken(user);

      return { user, jwt };
    } catch (error) {
      Logger.error(error);
      return { error: error.message, errorCode: 500 };
    }
  }
}
