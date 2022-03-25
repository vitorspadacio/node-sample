import { writeInternalServerError } from './infrastructure/write-response'
import { Context, Next } from 'koa'
import winston, { format, transports } from 'winston'
import Logger from '~/infrastructure/logger'
import { writeResponse } from '~/infrastructure/write-response'

export const apiLogger = (winstonInstance: typeof winston) => {
  winstonInstance.configure({
    level: 'info',
    // level: config.debugLogging ? "debug" : "info",
    silent: !!process.env.JEST_WORKER_ID,
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple(),
        ),
      }),
    ],
  })

  return async (ctx: Context, next: () => Promise<Next>) => {
    const start = new Date().getTime()
    try {
      await next()
    } catch (error: unknown) {
      Logger.error('Internal server error', error)
      writeInternalServerError(ctx, (error as any).message)
    }

    const ms = new Date().getTime() - start

    let logLevel: string
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else {
      logLevel = 'info'
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonInstance.log(logLevel, msg)
  }
}
