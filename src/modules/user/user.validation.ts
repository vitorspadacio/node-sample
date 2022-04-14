import Joi from 'joi'
import { User } from './user.types'

export const getUserSchema = Joi.object<User>({
  name: Joi.string().optional(),
})

export const postUserSchema = Joi.object<User>({
  name: Joi.string().required(),
  age: Joi.number().max(99).required(),
})

export const deleteUserSchema = Joi.object<User>({
  id: Joi.number().required(),
})

export const putUserSchema = Joi.object<User>({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().max(99).required(),
})
