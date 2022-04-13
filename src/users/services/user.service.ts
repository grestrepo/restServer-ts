import bcrypt from 'bcrypt';

import { User } from '../models';
import { CreateUser, UpdateUser } from '../../core/interfaces';

export class UserService {

  async getUsers(){
    const users = await User.find();

    return users;
  }

  async getUser(id: string){
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      return null;
    }
  }

  async createUser(payload: CreateUser){
    const salt = bcrypt.genSaltSync();
    payload.password = bcrypt.hashSync(payload.password, salt);
    const newUser = new User({
      ...payload
    });

    try {
      const user = await newUser.save();
      return user;
    } catch (error) {
      return null;
    }
    
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
}