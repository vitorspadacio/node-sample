import dotenv from 'dotenv'
import Logger from '../infrastructure/logger'

export default async () => {
  if (process.env.NODE_ENV !== 'production') {
    const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
    Logger.info(`Loading ${path} file from directory`)
    const result = await dotenv.config({ path })
    if (result.error) {
      Logger.error(`Error loading ${path} file from directory`, result.error)
      throw result.error
    }
  }
}
