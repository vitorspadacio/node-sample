import Router from '@koa/router'
import { Context } from 'koa'
import messages from '../../infrastructure/messages'
import validateRequest from '../../infrastructure/validate-request'
import service from './user.service'
import { User } from './user.types'
import { postUserSchema } from './user.validation'

const router = new Router({ prefix: '/user' })

router.get('/', async (ctx: Context) => {
  // #swagger.tags = ['Users']
  const { name } = <{ name: string }>ctx.request.query
  const { data } = await service.get(name)
  ctx.oK(data, messages.noDataFound(data))
})

router.post('/', validateRequest(postUserSchema), async (ctx: Context) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['User'] = {
      in: 'body',
      schema: { $ref: '#definitions/postUserSchema' }
    }
  */
  const payload = <User>ctx.request.body
  const response = await service.insert(payload)
  ctx.created(response, messages.successfullyCreated('User'))
})

export default router.routes()
