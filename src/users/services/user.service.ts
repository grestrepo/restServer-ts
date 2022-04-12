import { User } from '../models';

import {CreateUser, UpdateUser} from '../../core/interfaces';

export class UserService {
  async createUser(payload: CreateUser){
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
}