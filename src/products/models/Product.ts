import mongoose, { Model, Schema } from 'mongoose';
import { Product } from '../../core/interfaces';

export type IProduct = Product;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  }
});

productSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

const ProductModel: Model<IProduct> = mongoose.model('Product', productSchema);

export default ProductModel;