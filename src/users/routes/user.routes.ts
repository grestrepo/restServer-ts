import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers';

import { validatorHandler, existeEmail, existeId, validarJWT } from '../../core/middlewares';
import { createUserSchema, getUserSchema, updateUserSchema } from '../schemas';

export const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', [
  validatorHandler(getUserSchema, 'params'),
], getUser);

userRouter.post('/', [
  validatorHandler(createUserSchema, 'body'),
  existeEmail
], createUser);

userRouter.put('/:id', [
  validarJWT,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  existeId
], updateUser);

userRouter.delete('/:id', [
  validarJWT,
  validatorHandler(getUserSchema, 'params')
], deleteUser);