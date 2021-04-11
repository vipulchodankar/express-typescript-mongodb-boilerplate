import { config } from "dotenv";

config();

export const PORT: number = parseInt(String(process.env.PORT)) || 6969;
export const MONGO_URI: string = String(process.env.MONGO_URI);

// Bcrypt
export const SALT_ROUNDS = 10;

// JWT
export const JWT_SIGNATURE: string =
  String(process.env.JWT_SIGNATURE) || "todo_jwt";
export const JWT_EXPIRATION: string =
  String(process.env.JWT_EXPIRATION) || "1d";
