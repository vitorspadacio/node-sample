import glob from 'glob'
import swaggerAutogen from 'swagger-autogen'
import Logger from '../infrastructure/logger'

const routePaths = glob.sync('**/*.routes.ts')
const swaggerJsonPath = 'src/startup/swagger.json'

const doc = {
  info: {
    title: 'Node Sample',
    description: 'Um exemplo de backend completo em Node',
  },
  basePath: '/api/v1',
  host: '',
}

export default async (host) => {
  doc.host = host

  try {
    await routePaths
  } catch (ex) {
    Logger.info('Ocorreu erro ao obter rotas para o Swagger', ex)
  }

  try {
    await swaggerAutogen({ openapi: '3.0.0' })(swaggerJsonPath, routePaths, doc)
  } catch (ex) {
    Logger.info('Ocorreu erro ao gerar swagger.json', ex)
  }
}
