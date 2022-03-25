import Router from '@koa/router'
import { Context } from 'koa'
import { createContent, writeBadRequest, writeResponse } from '~/infrastructure/write-response'
import service from './user.service'

const router = new Router({ prefix: '/user' })

router.get('/', async (ctx: Context) => {
  const {errors, data} = await service.getAll()

  if (errors) {
    writeBadRequest(ctx, ...errors)
    return
  }

  writeResponse(ctx, 'Ok', createContent(data))
})

export default router.routes()
