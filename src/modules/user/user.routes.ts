import Router from '@koa/router'
import { Context } from 'koa'
import messages from '~/infrastructure/messages'
import validateRequest from '~/infrastructure/validate-request'
import service from './user.service'
import { User } from './user.types'
import { getUserSchema, postUserSchema } from './user.validation'

const router = new Router({ prefix: '/user' })

router.get('/', validateRequest(getUserSchema), async (ctx: Context) => {
  const query = <{ name: string }>ctx.request.query
  const { data } = await service.get(query.name)
  ctx.oK(data, messages.noDataFound(data))
})

router.post('/', validateRequest(postUserSchema), async (ctx: Context) => {
  const payload = <User>ctx.request.body
  const response = await service.insert(payload)
  ctx.created(response, messages.successfullyCreated('User'))
})

export default router.routes()
