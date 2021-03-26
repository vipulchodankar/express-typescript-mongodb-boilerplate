import { Request, Response, Router } from "express";

const indexRouter = Router();

indexRouter.get('/', (_req: Request, res: Response) => {
  res.send('Hello there');
})

export default indexRouter;
