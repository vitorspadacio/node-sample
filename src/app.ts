import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import './infrastructure/env'
import routes from './routes'

const app = new Koa()

export default app
	.use(bodyParser())
	.use(cors())
  .use(routes)
