import { createSuccessServiceResult, ServiceResult } from '../../infrastructure/create-service-result'
import repository from './user.repository'
import { User } from './user.types'

export default {
  get: async (name?: string): Promise<ServiceResult<User[]>> => {
    const users = await repository.get(name)
    return createSuccessServiceResult<User[]>(users)
  },
  insert: async (user: User): Promise<User> => repository.insert(user),
}
