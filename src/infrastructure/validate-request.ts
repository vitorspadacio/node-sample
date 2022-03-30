import Joi from 'joi'
import koa, { Context, Next } from 'koa'
import Logger from '~/infrastructure/logger'
import messages from './messages'

export default <T>(schema: Joi.ObjectSchema<T>): koa.Middleware => {
  return async (ctx: Context, next: Next) => {
    const payload = ctx.resquest?.query || ctx.request?.body
    const result = schema.validate(payload, { abortEarly: false })

    if (result.error) {
      const errors = result.error?.details?.map(({ message }) => message)
      Logger.warn('Validation error', errors)
      ctx.badRequest(errors, messages.invalidRequest)
      return
    }

    await next()
  }
}
