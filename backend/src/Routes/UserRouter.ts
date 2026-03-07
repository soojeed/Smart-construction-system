import express from 'express';
import { UserSchema } from '../schema/userSchema';
import { CreateUser, GetAllUser, login, updateUser, whoami } from '../Controller/userController';
import { validationMiddleware } from '../middleware/vadationMiddleware';
import {authenticate} from "../middleware/authenticate-middleware"

const router = express.Router();

router.post('/register', validationMiddleware, UserSchema, CreateUser)
router.get('/getAllUsers', GetAllUser)
router.post('/login', validationMiddleware, UserSchema, login)
router.put("/update", authenticate, updateUser)
router.get('/whoami', authenticate, whoami )

export default router;