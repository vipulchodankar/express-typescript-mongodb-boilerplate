import cookiesConfig from "../config/cookies";
import { IaddAuthToRes } from "../interfaces/IUser";

export const addAuthToRes: IaddAuthToRes = (res, accessToken, refreshToken) => {
  res.setHeader("Authorization", `Bearer ${accessToken}`);
  res.cookie("refreshToken", refreshToken, cookiesConfig);
};
