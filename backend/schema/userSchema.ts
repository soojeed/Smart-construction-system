import { body } from 'express-validator';


export const UserSchema = [
    body('fullName').isString().withMessage('Full Name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('passwordHash').isLength({ min: 6 }).withMessage('Password Hash must be at least 6 characters long')
]