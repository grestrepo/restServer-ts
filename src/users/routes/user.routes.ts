import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser } from '../controllers';

import { validatorHandler, existeEmail, existeId } from '../../core/middlewares';
import { createUserSchema, getUserValidator } from '../schemas';

export const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', [
  validatorHandler(getUserValidator, 'params'),
], getUser);

userRouter.post('/', [
  validatorHandler(createUserSchema, 'body'),
  existeEmail
], createUser);

userRouter.put('/:id', [
  validatorHandler(getUserValidator, 'params'),
  existeId
], updateUser);