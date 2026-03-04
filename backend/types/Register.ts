

export interface IRegister {
    id : number;
    fullName: string;
    email: string;
    passwordHash: string;
    password_conform: string;
}


export interface ILogin {
    email: string;
    passwordHash: string;
}