import Joi from 'joi'
import { User } from './user.types'

export const postUserSchema = Joi.object<User>({
  name: Joi.string().alphanum().required(),
  age: Joi.number().max(99).required(),
})
