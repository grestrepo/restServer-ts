import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { User } from '../../users/models';

import {IProperty} from '../interfaces';

export const validatorHandler = (schema: ObjectSchema, property: IProperty) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const {error} = schema.validate(data);
    if(error){
      return res.status(500).json({
        ok: false,
        error: error.details,
        message: error.message
      });
    }

    return next();
  };
};

export const existeEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await User.findOne({
    email
  });

  if(user){
    return res.status(400).json({
      ok: false,
      message: `El email ${email} ya está registrado`
    });
  }

  return next();
};

export const existeId = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({
        ok: false,
        message: `No existe el usuario con el id ${id}`
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: `Ocurrió un error`
    });
  }
};