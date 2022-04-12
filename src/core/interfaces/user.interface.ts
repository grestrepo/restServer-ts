export type typeRole = 'ADMIN'| 'USER';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: typeRole;
  state?: boolean;
}

export type CreateUser = Omit<User, '_id'>;
export type UpdateUser = Partial<CreateUser>;