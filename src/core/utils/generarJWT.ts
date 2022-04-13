import jwt, { Secret } from 'jsonwebtoken';


export const generarJWT = (uid = ''): Promise<string> => {
  const secretKey = process.env.SECRET_KEY as Secret;
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, secretKey, {
      expiresIn: '2h'
    }, (err, token) => {
      if(err){
        console.log({err});
        reject(`No se pudo generar el token`);
      }else{
        resolve(token as string);
      }
    });
  });
};