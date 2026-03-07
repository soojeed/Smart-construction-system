import { Role } from "../../generated/prisma/enums";


export interface IRegister {
    id? : number;
    fullName: string;
    email: string;
    role : Role
    password: string;
    password_conform: string;
}


export interface ILogin {
    email: string;
    passwordHash: string;
}


export interface IUpdate {
  
    fullName: string;
    role : Role
    
}