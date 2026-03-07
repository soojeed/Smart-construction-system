import {NextFunction, Response} from "express"
import {AuthRequest} from "../types/AuthRequest"
import {prisma} from "../lib/prisma"
import {catchError} from "../constants/message"


export const Authorized = (role : string[]) =>{
    return async (req: AuthRequest, res:Response, next : NextFunction)=>{
        try{
            const user = await prisma.user.findUnique({
             where:{
                id : req.userId!,
             }
            });

            if(!user){
                res.status
            }
        }catch(error){
        catchError(error, res)
    }
    }
}