
import { Response } from "express";


const serverError = "Something Went wrong Please try Again!";

export const catchError = (error: any, res: Response) => {
 console.log(error);
 res.status(500).json({
    message : serverError
 });

}

export  const shortRes =(
res : Response,
status: number,
message: string,
data?: any
) =>{
    res.status(status).json({
        message,
        data,
    });
}

