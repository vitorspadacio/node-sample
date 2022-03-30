import { Context, Next } from 'koa'
import Logger from '~/infrastructure/logger'

export default async (ctx: Context, next: Next) => {
  const startTime = new Date().getTime()

  try {
    await next()
  } catch (ex: any) {
    const error = ex.code || ex.message || 'Unknown error'
    Logger.error('An internal server error occured', ex)
    ctx.internalServerError({}, error)
  }

  const elapsedTime = new Date().getTime() - startTime
  const status = ctx.status
  const logLevel = status < 400 ? 'info' : status < 500 ? 'warn' : 'error'
  const message = `${ctx.method} ${ctx.status} ${ctx.url} ${elapsedTime}ms`

  Logger.log(logLevel, message)
}
