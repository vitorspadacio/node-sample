import Router from '@koa/router'
import { Context } from 'koa'
import { createContent, writeResponse } from '~/infrastructure/write-response'

const router = new Router({ prefix: '/health' })

router.get('/', (ctx: Context) => {
  writeResponse(ctx, 'Ok', createContent('ok'))
})

export default router.routes()
