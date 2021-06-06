import { CookieOptions } from "express";
import { isProduction } from "../utils/misc";

const cookiesConfig: CookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false,
  // Add sameSite & domain for prod
};

export default cookiesConfig;
