import Joi from 'joi'

export const getUserSchema = Joi.object({
  name: Joi.string().alphanum(),
})

export const postUserSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  age: Joi.number().max(99).required()
})
