import chalk from 'chalk'
import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '../../../configController'

export default function genericEndpoint(app: Application, context: typeof configController, method: 'get' | 'post', apiEndpointName: string, configKey: string, { errorMessage }: { errorMessage: string }) {
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/${apiEndpointName}`
  logger.debug('setup').yarn.whisper(`endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    logger.debug('configEndpointsDebug').yarn.whisper(`${apiEndpointName} config request | session: ${req?.session?.id || null}`)
    const enabled = req.body.enabled
    if (typeof enabled === 'undefined') res.status(400).send({ message: errorMessage })
    context.setSessionConfig(req, configKey, enabled)
    logger.yarn.status('config', `set [${chalk.yellow(apiEndpointName)}] to ${chalk.yellow(enabled)}`, true)
    res.send({ status: 'OK', key: configKey, value: enabled, sessionId: req.session.id })
  })
}
