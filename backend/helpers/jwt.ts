import jwt from 'jsonwebtoken';


const generateToken = (userId: number) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY || 'default-secret-key', {expiresIn: '1h'})
}