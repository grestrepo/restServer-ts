import { Router } from 'express';
import { getProducts } from '../controllers';

export const productRouter = Router();

productRouter.get('/', getProducts);