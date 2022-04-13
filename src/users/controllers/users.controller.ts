import { Request, Response } from 'express';
import { CreateUser } from '../../core/interfaces';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  console.log(users);
  res.status(200).json({
    ok: true,
    users
  });
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const user = await userService.getUser(id);

  if(!user){
    return res.status(404).json({
      ok: false,
      message: `El usuario con el id ${id} no existe`
    });
  }

  return res.status(201).json({
    ok: true,
    user
  });
};

export const createUser = async (req: Request, res: Response) => {

  const { name, email, password, role } = req.body;
  const payload: CreateUser = {name, email, password, role};

  try {
    const user = await userService.createUser(payload);
    if(!user){
      return res.status(400).json({
        ok: false,
        message: 'No se guardó el usuario'
      });
    }
  
    return res.json({
      ok: true,
      user
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: 'Ocurrió un Error, no se guardó el usuario',
      err: error
    });
  }

  
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const userUpdated = await userService.updateUser(id, payload);

  if(!userUpdated){
    return res.status(400).json({
      ok: false,
      message: 'ocurrió un Error'
    });
  }

  res.status(200).json({
    ok: true,
    user: userUpdated
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userService.deleteUser(id);
    if(!user){
      return res.status(404).json({
        ok: false,
        message: 'No se encontró el usuario'
      });
    }

    return res.status(200).json({
      ok: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Ocurrió un Error'
    });
  }
};