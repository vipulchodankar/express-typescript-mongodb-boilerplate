import { IUserLoginInput, IUserRegisterInput } from "../interfaces/IUser";
import { compare, genSalt, hash } from "bcrypt";
import { saltRounds } from "../config";
import User from "../models/User";
import { USER_NOT_FOUND, WRONG_CREDENTIALS } from "../config/constants";
import Logger from "../lib/logger";

export default class AuthService {
  constructor() {}

  public async register(data: IUserRegisterInput) {
    try {
      const { name, email, password } = data;

      const salt = await genSalt(saltRounds);
      const hashedPassword = await hash(password, salt);

      const user = await User.create({ name, email, password: hashedPassword });

      return { user };
    } catch (error) {
      Logger.error(error);
      return { error: error.message };
    }
  }

  public async login(data: IUserLoginInput) {
    try {
      const { email, password } = data;

      const user = await User.findOne({ email });

      if (!user) throw new Error(USER_NOT_FOUND);

      const result = await compare(password, user.password);

      if (result) return { user };
      else throw new Error(WRONG_CREDENTIALS);
    } catch (error) {
      return { error: error.message };
    }
  }
}
