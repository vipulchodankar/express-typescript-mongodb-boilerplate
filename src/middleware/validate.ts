import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";

/**
 * Validate that data being POST or PUT
 * is right else return 400 Bad Request
 * @param {*} schema is a yup schema
 */
const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      // if not valid, throws error
      await schema.validate(data);
      return next();
    } catch (e) {
      return res.status(400).json({ error: e.errors.join(", ") });
    }
  };

export default validate;
