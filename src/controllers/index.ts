import { Request, Response } from "express";

export const ping = async (_req: Request, res: Response) => {
  res.send("Hello There");
};
