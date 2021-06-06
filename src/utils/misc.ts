import { NODE_ENV } from "../config";

export const isProduction = NODE_ENV === "production";
