import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Authentication from '../utils/Authentication';

interface Payload {
  userId: number;
  name: string;
  email: string;
}
export const auth = (req: Request, res: Response, next: NextFunction): any => {
  
  const token = req.header("jwt_token");
  
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }
  try {
    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    const userCreds: string | object = jwt.verify(token, secretKey);

    if (userCreds) {
      req.app.locals.credentials = userCreds;
      
      return next();
    }
    return res.send("token invalid");
  } catch (err) {
    return res.send(err);
  }
};