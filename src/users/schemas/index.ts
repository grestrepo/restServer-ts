
import * as Joi from 'joi';

export const id = Joi.string();
export const name = Joi.string().min(3).max(100);
export const email = Joi.string().min(3).email();
export const password = Joi.string().min(4).max(100);
export const role = Joi.string().max(100);
export const state = Joi.boolean();

export const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
  state: state
});

export const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
  state: state
});

export const getUserSchema = Joi.object({
  id: id.required()
});

export const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});