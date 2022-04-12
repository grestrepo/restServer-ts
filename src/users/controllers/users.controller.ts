import { Request, Response } from 'express';
import { CreateUser } from '../../core/interfaces';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {

  const {name, email, password, role} = req.body;
  const payload: CreateUser = {name, email, password, role};

  const user = await userService.createUser(payload);

  if(!user){
    return res.status(400).json({
      ok: false,
      message: 'Ocurrió un Error, no se guardó el usuario'
    });
  }

  res.json({
    ok: true,
    user
  });
};