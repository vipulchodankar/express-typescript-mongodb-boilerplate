import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
