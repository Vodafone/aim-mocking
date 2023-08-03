import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '../../../configController'

export default function healthEndpoint(app: Application, context: typeof configController) {
  const method = 'post'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/health`
  logger.debug('setup').yarn.whisper(`AIM: endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    logger.debug('configEndpoints').yarn.whisper(`AIM: health config request`)
    res.send({ status: 200, sessionId: req.session.id || null })
  })
}
