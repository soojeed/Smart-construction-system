import express from 'express';
import { UserSchema } from '../../schema/userSchema';
import { CreateUser } from '../Controller/userController';
import { validationMiddleware } from '../../middleware/vadationMiddleware';

const router = express.Router();

router.post('/register', validationMiddleware, UserSchema, CreateUser)

export default router;