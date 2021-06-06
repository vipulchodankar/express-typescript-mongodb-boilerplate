import { IUser } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      userId?: IUser["_id"];
    }
  }
}
