import Logger from '../infrastructure/logger'
import app from './app'
import loadEnv from './load-env'
import swaggerDoc from './swagger-doc'

export default async () => {
  await loadEnv()

  const port = process.env.PORT || 1234
  const host = `localhost:${port}`

  await swaggerDoc(host)
  app.listen(port)

  Logger.info('---------------------------')
  Logger.info('Server has started!  🚀')
  Logger.info('---------------------------')
  Logger.info(`Listening port: http://${host}/`)
  Logger.info(`Documentation: http://${host}/docs`)
  Logger.info('---------------------------')
}
