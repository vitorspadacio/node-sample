import Logger from '../infrastructure/logger'
import app from './app'
import createSwaggerDoc from './create-swagger-doc'
import loadEnv from './load-env'

export default async () => {
  await loadEnv()

  const port = process.env.PORT || 1234
  const host = `localhost:${port}`

  await createSwaggerDoc(host)
  app.listen(port)

  Logger.info('---------------------------')
  Logger.info('Server has started!  🚀')
  Logger.info('---------------------------')
  Logger.info(`Listening port: http://${host}/`)
  Logger.info(`Documentation: http://${host}/docs`)
  Logger.info('---------------------------')
}
