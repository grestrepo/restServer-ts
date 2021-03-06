import mongoose, { Model, Schema } from 'mongoose';
import { User } from '../../core/interfaces';

export type IUser = User;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER']
  },
  state: {
    type: Boolean,
    default: true
  }
});

userSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

const UserModel: Model<IUser> = mongoose.model('User', userSchema);

export default UserModel;