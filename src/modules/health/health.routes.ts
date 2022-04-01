import Router from '@koa/router'
import { Context } from 'koa'

const router = new Router({ prefix: '/health' })

router.get('/', (ctx: Context) => {
  // #swagger.tags = ['Health']
  ctx.oK({}, 'Everything is health 😁')
})

export default router.routes()
