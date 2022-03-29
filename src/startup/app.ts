import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import routes from '../modules/routes'
import startApiLog from './start-request-log'
import startResponse from './start-response'
import startSwaggerUi from './start-swagger-ui'

const app = new Koa()

export default app
  .use(bodyParser())
  .use(cors())
  .use(startResponse())
  .use(startSwaggerUi())
  .use(routes)
  .use(startApiLog)
