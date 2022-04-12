import { Router } from 'express';
import { createUser } from '../controllers';

export const userRouter = Router();

userRouter.post('/', createUser);