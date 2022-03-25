import dotenv from 'dotenv'
import Logger from '~/infrastructure/logger'

if (process.env.NODE_ENV !== 'production') {
  const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  Logger.info(`Loading ${path} file from directory`)
  const result = dotenv.config({ path })
  if (result.error) { throw result.error }
}
