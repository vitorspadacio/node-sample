import Logger from '~/infrastructure/logger'
import app from './app'
import createSwaggerDoc from './create-swagger-doc'
import loadEnv from './load-env'

const port = process.env.PORT || 1234
const host = `http://localhost:${port}`

export default async () => {
  await loadEnv()
  await createSwaggerDoc()
  app.listen(port)

  Logger.info('---------------------------')
  Logger.info('Server has started!  🚀')
  Logger.info('---------------------------')
  Logger.info(`Listening port: ${host}/`)
  Logger.info(`Documentation: ${host}/docs`)
  Logger.info('---------------------------')
}
