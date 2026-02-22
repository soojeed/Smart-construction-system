

export interface IRegister {
    id : number;
    fullName: string;
    email: string;
    password: string;
    passwordHash: string;
}


export interface ILogin {
    email: string;
    passwordHash: string;
}