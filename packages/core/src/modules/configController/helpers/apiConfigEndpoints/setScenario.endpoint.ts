import chalk from 'chalk'
import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '../../../configController'

export default function getScenarioEndpoint(app: Application, context: typeof configController) {
  const method = 'post'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/setScenario`
  logger.debug('setup').yarn.whisper(`endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    logger.debug('configEndpointsDebug').yarn.whisper(`setScenarioEndpoint config request`)
    const scenario = req.body.scenario
    if (typeof scenario === 'undefined') res.status(400).send({ message: 'Missing "scenario" key on the request body' })
    context.setSessionConfig(req, 'scenario', scenario)
    logger.yarn.status('config', `set [${chalk.yellow('setScenario')}] to ${chalk.yellow(scenario)}`, true)
    res.send({ status: 'OK', scenario })
  })
}
