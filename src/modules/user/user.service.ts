import { createErrorServiceResult, createSuccessServiceResult } from '~/infrastructure/create-service-result'
import Logger from '~/infrastructure/logger'
import { ServiceResult } from './../types'
import repository from './user.repository'
import { User } from './user.types'

export default {
  getAll: async (): Promise<ServiceResult<User[]>> => {
    try {
      const users = await repository.getAll()
      return createSuccessServiceResult<User[]>(users)
    } catch(ex: unknown) {
      Logger.info(`An error has occured (${ex})`)
      return createErrorServiceResult<User[]>(ex as string)
    }
  }
}
