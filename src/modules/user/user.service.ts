import messages from '../../infrastructure/messages'
import { createErrorServiceResult, createSuccessServiceResult, ServiceResult } from '../../infrastructure/create-service-result'
import repository from './user.repository'
import { User } from './user.types'

export default {
  get: async (name?: string): Promise<ServiceResult<User[]>> => {
    const users = await repository.get(name)
    return createSuccessServiceResult<User[]>(users)
  },

  insert: async (user: User): Promise<ServiceResult<User>> => {
    const createdUser = await repository.insert(user)
    return createSuccessServiceResult<User>(createdUser)
  },

  delete: async (id: number): Promise<ServiceResult<number>> => {
    const userExists = await repository.getById(id)
    if (!userExists) return createErrorServiceResult(messages.notFindById(id))

    await repository.delete(id)
    return createSuccessServiceResult<number>(id)
  },

  update: async (user: User): Promise<ServiceResult<User>> => {
    const updatedUser = await repository.update(user)
    if (!updatedUser) return createErrorServiceResult(messages.notFindById(Number(user.id)))
    return createSuccessServiceResult<User>(updatedUser)
  },
}
