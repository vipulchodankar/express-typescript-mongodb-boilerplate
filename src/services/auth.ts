import { compare, genSalt, hash } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SIGNATURE, saltRounds } from "../config";
import { IUserLoginInput, IUserRegisterInput } from "../interfaces/IUser";
import Logger from "../lib/logger";
import User, { IUser } from "../models/User";

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
      const foundUser = await User.findOne({ email });

      if (foundUser)
        return { error: "User with this email already exists", errorCode: 404 };

      const salt = await genSalt(saltRounds);
      const hashedPassword = await hash(password, salt);

      const user = await User.create({ name, email, password: hashedPassword });
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
      const user = await User.findOne({ email });

      if (!user) return { error: "User not found", errorCode: 404 };

      const result = await compare(password, user.password);

      if (!result)
        return { error: "Invalid email or password", errorCode: 400 };

      const jwt = this.generateToken(user);

      return { user, jwt };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }
}
