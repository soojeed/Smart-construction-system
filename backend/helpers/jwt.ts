import jwt from 'jsonwebtoken';


export const generateToken = (userId: string) =>{
   return jwt.sign({userId}, process.env.JWT_SECRET_KEY || 'default-secret-key', {expiresIn: '1h'})
   
}