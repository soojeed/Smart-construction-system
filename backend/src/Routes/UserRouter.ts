import express from 'express';
import { UserSchema } from '../../schema/userSchema';
import { CreateUser, GetAllUser, UserLogin } from '../Controller/userController';
import { validationMiddleware } from '../../middleware/vadationMiddleware';

const router = express.Router();

router.post('/register', validationMiddleware, UserSchema, CreateUser)
router.get('/getAllUsers', GetAllUser)
router.post('/login', validationMiddleware, UserSchema, UserLogin)

export default router;