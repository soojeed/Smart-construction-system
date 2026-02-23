import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";


export const authenticate = async (req: AuthRequest, res:Response, next: NextFunction)=>{
    try{
        const authHeader = req?.headers?.authorization;

        if(authHeader){
            res.status(401).json({message:"Unauthorization(NO AUTHHEADERS)", isSucces: false});
            return
        }

        const token = authHeader?.split("")[1];

        if(!token){
            res.status(401).json({message:'unythorization(NO Token)', isSuccess:false});
            return
        }
    }catch(error){
        res.status(500).json({})
    }
}