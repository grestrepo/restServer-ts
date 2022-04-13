import express, {Application} from 'express';
import cors from 'cors';

import { dbConnection } from './core/config';

import { userRouter, authRouter } from './users/routes';
import { productRouter } from './products/routes';

interface IPath {
  users: string;
  auth: string;
  products: string;
}

export class Server {

  app: Application;
  path: IPath;
  port: string;

  constructor(){
    this.app = express();
    this.port = '3000';
    this.path = {
      users: '/api/v1/users',
      auth: '/api/v1/auth',
      products: '/api/v1/products'
    };

    //ConectarDb
    this.db();

    //middlewares
    this.middlewares();

    //routes
    this.routes();
  }

  private async db(){
    await dbConnection();
  }

  private middlewares(){
    this.app.use(cors({origin: true}));
    this.app.use(express.json());
  }

  private routes(){
    this.app.use(this.path.users, userRouter);
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.products, productRouter);
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Escuchando puerto ${this.port}`);
    });
  }
}