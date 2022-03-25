import { Context } from 'koa'

export enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501,
}

export interface Response {
  data?: unknown,
  messages?: string[],
}

export const writeResponse = <T extends keyof typeof HttpStatusCode>
(ctx: Context, status: T, data: Response) => {
  ctx.body = data
  ctx.status = HttpStatusCode[status]
}

export const createContent = (data: unknown): Response => ({data})

export const createError = (...message: string[]): Response => ({messages: [...message]})

// Aliases
export const writeBadRequest = (ctx: Context, ...message: string[]) =>
  writeResponse(ctx, 'BadRequest', createError(...message))

export const writeInternalServerError = (ctx: Context, ...message: string[]) =>
  writeResponse(ctx, 'InternalServerError', createError(...message))
