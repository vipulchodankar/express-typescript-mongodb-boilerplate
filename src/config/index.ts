import { config } from "dotenv";
import { ConnectOptions } from "mongoose";

config();

export const PORT: number = parseInt(String(process.env.PORT)) || 6969;
export const MONGO_URI: string = String(process.env.MONGO_URI);
export const MONGO_OPTIONS: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

if (!MONGO_URI) throw new Error("MONGO_URI Required");

// Bcrypt
export const SALT_ROUNDS = 10;

// Tokens
export const ACCESS_TOKEN_SECRET: string = String(
  process.env.ACCESS_TOKEN_SECRET
);
export const ACCESS_TOKEN_EXPIRATION: string =
  String(process.env.ACCESS_TOKEN_EXPIRATION) || "15m";

if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET Required");

export const REFRESH_TOKEN_SECRET: string = String(
  process.env.REFRESH_TOKEN_SECRET
);
export const REFRESH_TOKEN_EXPIRATION: string =
  String(process.env.REFRESH_TOKEN_EXPIRATION) || "7d";

if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET Required");

export const NODE_ENV: String = String(process.env.NODE_ENV) || "development";
