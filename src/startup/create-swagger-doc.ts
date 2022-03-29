import glob from 'glob'
import swaggerAutogen from 'swagger-autogen'
import Logger from '~/infrastructure/logger'

const routePaths = glob.sync('**/*.routes.ts')
const swaggerJsonPath = 'src/startup/swagger.json'

const doc = {
  info: {
    title: 'Node Sample',
    description: 'Um exemplo de backend completo em Node',
  },
}

export default async () => {
  try {
    await routePaths
  } catch(ex) {
    Logger.info('Ocorreu erro ao obter rotas para o Swagger', ex)
  }

  try {
    await swaggerAutogen()(swaggerJsonPath, routePaths, doc)
  } catch(ex) {
    Logger.info('Ocorreu erro ao gerar swagger.json', ex)
  }
}
