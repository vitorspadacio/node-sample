import Router from '@koa/router'
import { Context } from 'koa'
import messages from '../../infrastructure/messages'
import validateRequest from '../../infrastructure/validate-request'
import service from './user.service'
import { User } from './user.types'
import {
  deleteUserSchema, getUserSchema, postUserSchema, putUserSchema,
} from './user.validation'

const router = new Router({ prefix: '/user' })

router.get('/', validateRequest(getUserSchema), async (ctx: Context) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['data'] = { in: 'query', schema: { $ref: '#definitions/getUserSchema' } }
  */
  const { name } = <{ name: string }>ctx.request.query
  const { data } = await service.get(name)
  ctx.oK(data, messages.noDataFound(data))
})

router.post('/', validateRequest(postUserSchema), async (ctx: Context) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['data'] = { in: 'body', schema: { $ref: '#definitions/postUserSchema' } }
  */
  const payload = <User>ctx.request.body
  const { data } = await service.insert(payload)
  ctx.created(data, messages.successfullyCreated('User'))
})

router.delete('/', validateRequest(deleteUserSchema), async (ctx: Context) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['data'] = { in: 'query', schema: { $ref: '#definitions/deleteUserSchema' } }
  */
  const { id } = <{ id: string }>ctx.request.query
  const { errors } = await service.delete(Number(id))

  if (errors) {
    ctx.badRequest({}, ...errors)
    return
  }

  ctx.accepted({}, messages.successfullyDeleted('User'))
})

router.put('/', validateRequest(putUserSchema), async (ctx: Context) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['data'] = { in: 'query', schema: { $ref: '#definitions/putUserSchema' } }
  */
  const user = <User>ctx.request.body
  const { errors, data } = await service.update(user)

  if (errors) {
    ctx.badRequest({}, ...errors)
    return
  }

  ctx.accepted(data, messages.successfullyUpdated('User'))
})

export default router.routes()
