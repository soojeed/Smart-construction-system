import {Request, Response} from 'express';
import { IRegister } from '../../types/Register';
import {prisma} from '../lib/prisma';

export const CreateUser = async (req: Request, res: Response) =>{
    try{
        const data : IRegister = req.body;

        if(data.password !== data.passwordHash){
            return res.status(400).json({message: 'Password and Password Hash do not match', isSuccess: false})
        }


        const user = await prisma.user.findUnique({
            where :{
                email : data.email
            }
        })

      if(user){
            res.status(409).json({Message : "User Already Exits", isSucces: false})
        
            return
        
        }


        const Create = await prisma.user.create({
            data:{
                fullName: data.fullName,
                email: data.email,
                passwordHash: data.passwordHash
            }
        })

        res.status(201).json({message: 'User created successfully', isSuccess: true, cratedUser: Create})

    }catch(error){
        res.status(500).json({message: 'Internal Server Error', isSuccess: false})
    }
}


export const GetAllUser = async (req:Request, res:Response) => {
  
      const users = await prisma.user.findMany({
        select:{
            id: true,
            fullName: true,
            email: true,
            createdAt: true,
            role : true
        }
       
      })
      res.status(200).json({isSuccess:true, users: users})
  

}

