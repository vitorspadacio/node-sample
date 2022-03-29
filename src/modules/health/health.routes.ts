import Router from '@koa/router'
import { Context } from 'koa'

const router = new Router({ prefix: '/health' })

router.get('/', (ctx: Context) => {
  ctx.oK({}, 'Everything is health 😁')
})

export default router.routes()
