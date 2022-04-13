import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.findProducts();

  res.status(200).json({
    ok: true,
    products
  });
};