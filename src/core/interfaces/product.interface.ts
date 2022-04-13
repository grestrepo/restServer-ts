export interface Product {
  _id: string;
  name: string;
  description: string;
  state: boolean;
  user: string;
  price: number
}

export type CreateProduct = Omit<Product, '_id'>;
export type UpdateProduct = Partial<CreateProduct>;