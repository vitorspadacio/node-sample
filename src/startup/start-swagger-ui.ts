import { koaSwagger } from 'koa2-swagger-ui'
import spec from './swagger.json'

export default () => koaSwagger({
  swaggerOptions: {
    spec,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    docExpansion: 'none',
    jsonEditor: false,
    defaultModelRendering: 'schema',
    showRequestHeaders: false,
  }
})
