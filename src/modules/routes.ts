import Router from '@koa/router'
import healthRoutes from './health/health.routes'
import userRoutes from './user/user.routes'

export default new Router({prefix: '/api/v1'})
  .use(healthRoutes)
  .use(userRoutes)
  .routes()
