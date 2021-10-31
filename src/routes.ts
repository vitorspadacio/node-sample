import Router from '@koa/router'
import healthRoutes from './modules/health/health.routes'

export default new Router({prefix: '/api/v1'})
  .use(healthRoutes)
  .routes()
