import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '../../../configController'

export default function getConfigOptionEndpoint(app: Application, context: typeof configController) {
  const method = 'post'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/getConfigOption`
  logger.debug('setup').yarn.whisper(`endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    const key = req.body.key
    logger.debug('configEndpointsDebug').yarn.whisper(`getConfigOption:${key} config request`)
    if (typeof key === 'undefined') res.status(400).send({ message: 'Missing "key" for option key on the request body' })
    const value = context.getSessionConfig(req, key)
    res.send({ status: 'OK', key, value, sessionId: req.session.id })
  })
}
