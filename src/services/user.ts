import { IUserRegisterInput } from "../interfaces/IUser";
import User, { IUser } from "../models/User";

interface IUserService {
  user?: IUser;
  error?: string;
  errorCode?: number;
}

export default class UserService {
  constructor() {}

  public async findById(_id: IUser["_id"]): Promise<IUserService> {
    try {
      const user = await User.findById(_id).select("-password");

      if (!user) return { error: "User not found", errorCode: 404 };

      return { user };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }

  public async findOne(
    data: Pick<IUser, "_id" | "email">
  ): Promise<IUserService> {
    try {
      const user = await User.findOne({ ...data });

      if (!user) return { error: "User not found", errorCode: 404 };

      return { user };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }

  public async create(data: IUserRegisterInput): Promise<IUserService> {
    try {
      const user = await User.create(data);

      return { user };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }

  public async update(
    id: IUser["_id"],
    data: Partial<IUser>
  ): Promise<IUserService> {
    try {
      const user = await User.findByIdAndUpdate(id, data).select("-password");

      if (!user) throw new Error("No user");

      return { user };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }

  public async delete(id: IUser["_id"]): Promise<IUserService> {
    try {
      await User.findByIdAndDelete(id);

      return { user: undefined };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }
}
