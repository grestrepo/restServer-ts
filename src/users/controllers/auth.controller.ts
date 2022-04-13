import {Request, Response} from 'express';

import { generarJWT } from '../../core/utils';

export const login = async (req: Request, res: Response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);
  res.json({
    ok: true,
    message: 'login',
    token
  });
};