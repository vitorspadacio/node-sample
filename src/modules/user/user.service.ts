import { createSuccessServiceResult } from '~/infrastructure/create-service-result'
import { ServiceResult } from './../types'
import repository from './user.repository'
import { User } from './user.types'

export default {
  getAll: async (): Promise<ServiceResult<User[]>> => {
    const users = await repository.getAll()
    return createSuccessServiceResult<User[]>(users)
  }
}
