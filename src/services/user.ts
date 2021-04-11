import User, { IUser } from "../models/User";

export default class UserService {
  constructor() {}

  public async findById(_id: IUser["_id"]) {
    try {
      const user = User.findById(_id).select("-password");

      if (!user) return { error: "User not found", errorCode: 404 };

      return { user };
    } catch (error) {
      return { error: error.message, errorCode: 500 };
    }
  }
}
