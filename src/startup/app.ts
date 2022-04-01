import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import requestLog from './request-log'
import response from './response'
import routes from './routes'
import swaggerUi from './swagger-ui'

const app = new Koa()

export default app
  .use(cors())
  .use(bodyParser())
  .use(requestLog())
  .use(response())
  .use(swaggerUi())
  .use(routes())
