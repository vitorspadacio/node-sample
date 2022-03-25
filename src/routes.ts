import Router from '@koa/router'
import healthRoutes from './modules/health/health.routes'
import userRoutes from './modules/user/user.routes'

export default new Router({prefix: '/api/v1'})
  .use(healthRoutes)
  .use(userRoutes)
  .routes()
