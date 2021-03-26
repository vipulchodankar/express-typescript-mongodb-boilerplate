import { config } from "dotenv";

config();

export const PORT: Number = parseInt(String(process.env.PORT)) || 5000;
export const MONGO_URI: string = String(process.env.MONGO_URI);

// Bcrypt
export const saltRounds = 10;
