import knex from '~/infrastructure/knex'
import { User } from './user.types'

const table = 'users'

export default {
  getAll: () => knex<User>(table)
}
