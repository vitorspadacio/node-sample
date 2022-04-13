import Joi from 'joi'
import { User } from './user.types'

export const getUserSchema = Joi.object<User>({
  name: Joi.string().alphanum().optional(),
})

export const postUserSchema = Joi.object<User>({
  name: Joi.string().alphanum().required(),
  age: Joi.number().max(99).required(),
})

export const deleteUserSchema = Joi.object<User>({
  id: Joi.number().required(),
})
