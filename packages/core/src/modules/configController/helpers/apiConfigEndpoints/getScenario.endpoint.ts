import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/lib-aim-logger'

import configController from '../../../configController'

export default function getScenarioEndpoint(app: Application, context: typeof configController) {
  const method = 'post'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/getScenario`
  logger.debug('setup').yarn.whisper(`AIM: endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    logger.debug('configEndpoints').yarn.whisper(`AIM: getScenarioEndpoint config request`)
    const scenario = context.getSessionConfig(req, 'scenario')
    res.send({ status: 'OK', scenario })
  })
}
