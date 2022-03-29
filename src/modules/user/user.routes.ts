import Router from '@koa/router'
import { Context } from 'koa'
import service from './user.service'

const router = new Router({ prefix: '/user' })

router.get('/', async (ctx: Context) => {
  const {errors, data} = await service.getAll()

  if (errors) {
    ctx.badRequest(errors)
    return
  }

  ctx.oK(data)
})

router.post('/', async (ctx: Context) => {
  console.info(ctx.request.body)
  // const {errors, data} = await service.getAll()

  // if (errors) {
  //   ctx.badRequest({}, ...errors)
  //   return
  // }

  // ctx.oK(data)
})

export default router.routes()
