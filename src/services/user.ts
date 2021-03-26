import User, { IUser } from "../models/User";

export default class UserService {
  constructor() {}

  public async findById(email: IUser["email"]) {
    return User.findById(email);
  }
}
