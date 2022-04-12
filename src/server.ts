import express, {Application} from 'express';
import cors from 'cors';

import { dbConnection } from './core/config';
import { userRouter } from './users/routes';

interface IPath {
  users: string
}

export class Server {

  app: Application;
  path: IPath;
  port: string;

  constructor(){
    this.app = express();
    this.port = '3000';
    this.path = {
      users: '/api/v1/users'
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

  private routes(){
    this.app.use(this.path.users, userRouter);
  }

  private middlewares(){
    this.app.use(cors({origin: true}));
    this.app.use(express.json());
  }


  listen(){
    this.app.listen(this.port, () => {
      console.log(`Escuchando puerto ${this.port}`);
    });
  }
}