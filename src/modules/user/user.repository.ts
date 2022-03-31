import knex from '../../infrastructure/knex'
import { User } from './user.types'

const table = 'users'

export default {
  get: (name?: string) => knex<User>(table).whereILike('name', `%${name}%`),
  insert: async (user: User) => {
    const [id] = await knex<User>(table).insert(user)
    return { ...user, id }
  },
}
