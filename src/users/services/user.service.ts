import bcrypt from 'bcrypt';

import { User } from '../models';
import { CreateUser, UpdateUser } from '../../core/interfaces';

export class UserService {

  async getUsers(){
    const users = await User.find();

    return users;
  }

  getUser(id: string){
    return User.findById(id);
  }

  async createUser(payload: CreateUser){
    const salt = bcrypt.genSaltSync();
    payload.password = bcrypt.hashSync(payload.password, salt);
    const newUser = new User({
      ...payload
    });

    return await newUser.save();    
  }

  async updateUser(id: string, payload: UpdateUser){
    try {
      const user = await User.findByIdAndUpdate(id, payload, {
        new: true
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async deleteUser(id: string){
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      return null;
    }
  }
}