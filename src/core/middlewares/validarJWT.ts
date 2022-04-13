import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { User } from '../../users/models';


export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if(!token){
    return res.status(401).json({
      ok: false,
      message: `No hay token en la petición`
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    const uid = payload['uid'] as string;
    const user = await User.findById(uid);
    req.uid = uid;
    req.user = user;
    return next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: 'Token no válido'
    });
  }
};