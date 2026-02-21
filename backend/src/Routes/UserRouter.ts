import express from 'express';
import { UserSchema } from '../../schema/userSchema';
import { CreateUser, GetAllUser } from '../Controller/userController';
import { validationMiddleware } from '../../middleware/vadationMiddleware';

const router = express.Router();

router.post('/register', validationMiddleware, UserSchema, CreateUser)
router.get('/getAllUsers', GetAllUser)

export default router;