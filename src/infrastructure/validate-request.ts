import Joi from 'joi'
import koa, { Context, Next } from 'koa'
import Logger from './logger'
import messages from './messages'

interface Request extends koa.Request {
  body: string,
}

const getPayload = ({ query, body }: Request) => {
  if (Object.keys(query).length) return query
  if (Object.keys(body).length) return body
  return {}
}

export default <T>(
  schema: Joi.ObjectSchema<T>): koa.Middleware => async (ctx: Context, next: Next) => {
  const payload = getPayload(ctx.request as Request)

  const result = schema.validate(payload, { abortEarly: false })

  if (result.error) {
    const errors = result.error?.details?.map(({ message }) => message)
    Logger.warn('Validation error', errors)
    ctx.badRequest(errors, messages.invalidRequest)
    return
  }

  await next()
}
