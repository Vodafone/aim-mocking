import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '../../../configController'

export default function getScenarioEndpoint(app: Application, context: typeof configController) {
  const method = 'post'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/getScenario`
  logger.debug('setup').yarn.whisper(`endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    logger.debug('configEndpointsDebug').yarn.whisper(`getScenarioEndpoint config request`)
    const scenario = context.getSessionConfig(req, 'scenario')
    res.send({ status: 'OK', scenario })
  })
}
