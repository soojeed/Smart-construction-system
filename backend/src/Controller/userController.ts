import {Request, Response} from 'express';
import { ILogin, IRegister } from '../../types/Register';
import {prisma} from '../lib/prisma';
import argon2 from 'argon2';
import {generateToken} from '../../helpers/jwt'

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
     const password_Hashed = await argon2.hash(data.passwordHash);

        const Create = await prisma.user.create({
            data:{
                fullName: data.fullName,
                email: data.email,
                passwordHash: password_Hashed
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



export const UserLogin = async (req: Request, res: Response) =>{
    try{
       const data : ILogin = req.body;

       const user = await prisma.user.findUnique({
        where :{
            email : data.email.toLowerCase()
        }
       })

       if(!user){
        res.status(200).json({message: 'correct email or password!', isSuccess: false});
        return
       }

     // veriffy password here using argon2 or any other hashing library

     const isPasswordcorrect = await argon2.verify(user.passwordHash, data.passwordHash);
     
     if(!isPasswordcorrect){
        res.status(200).json({message: 'correct email or password!', isSuccess: false});
        return
     }

     const generatedToken = generateToken(user.id)

     res.status(200).json({message: 'Login successful', isSuccess: true, token: generatedToken})

    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Internal Server Erroraa', isSuccess: false})
    }
}