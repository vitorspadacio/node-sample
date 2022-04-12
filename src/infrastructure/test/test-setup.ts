import knex from 'knex'
import loadEnv from '../../startup/load-env'
import { getConfig } from '../database'

const tables = [
  'users',
]

const setup = async () => {
  await loadEnv()
  const knexWithoutDb = knex(getConfig(true))
  await knexWithoutDb.raw(`create database if not exists ${process.env.DB_NAME};`)
  knexWithoutDb.destroy()

  const knexWithDb = knex(getConfig())
  await knexWithDb.migrate.latest()
}

const teardown = async () => {
  const knexWithoutDb = knex(getConfig(true))
  // await knexWithoutDb.raw(`drop database ${process.env.DB_NAME};`)
  knexWithoutDb.destroy()
}

const truncateTables = async () => {
  const database = knex(getConfig())
  await Promise.all(tables.map((table) => database(table).truncate()))
}

beforeEach(async () => {
  jest.clearAllMocks()
  await truncateTables()
})

beforeAll(async () => {
  await setup()
})

afterAll(async () => {
  await teardown()
})
