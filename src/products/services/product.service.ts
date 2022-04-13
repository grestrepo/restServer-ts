import { Product } from '../models';

export class ProductService {
  async findProducts(){
    const products = await Product.find();
    return products;
  }
}