import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { catchError, shortRes } from "../constants/message";
import  jwt  from "jsonwebtoken";

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const headers = req?.headers?.authorization;

    if (!headers || !headers.startsWith("Bearer ")) {
      return shortRes(res, 401, "Un-Authorized (No or Invalid Header)");
    }

    const token = headers.split(" ")[1];
    
    // 1. Hubi in Secret Key-gu jiro ka hor intaanad verify samayn
    const secretKey = process.env.JWT_SECRET_KEY; // Ama JWT_SECRET (kii .env ku qoran)
    
    if (!secretKey) {
       console.error("DIGNIIN: JWT_SECRET_KEY kuma jiro .env file-ka!");
       return shortRes(res, 500, "Server Secret Configuration Error");
    }

    // 2. Halkan ayuu error-ku ka dhashaa haddii saxiixu khaldan yahay
    const decode: any = jwt.verify(token, secretKey);

    if (!decode) {
      return shortRes(res, 401, "Un-Authorized (Invalid Token)");
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    // Haddii saxiixu khaldan yahay, halkan ayuu soo qabanayaa
    console.log("JWT Error:", error);
    catchError(error, res);
  }
};