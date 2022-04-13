import { Router } from 'express';
import { login } from '../controllers';

import { validatorHandler, validarLogin } from '../../core/middlewares';
import { loginUserSchema } from '../schemas';


export const authRouter = Router();

authRouter.post('/login', [
  validatorHandler(loginUserSchema, 'body'),
  validarLogin
], login);