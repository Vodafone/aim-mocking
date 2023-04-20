import chalk from 'chalk'
import { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import logger from '@vfuk/lib-aim-logger'

import configController from '../../../configController'

export default function getScenarioEndpoint(app: Application, context: typeof configController) {
  const method = 'post'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/setScenario`
  logger.debug('setup').yarn.whisper(`AIM: endpoint: [${method}] "${endpointUrl}"`)
  app[method](endpointUrl, bodyParser.json(), (req: Request, res: Response) => {
    logger.debug('configEndpoints').yarn.whisper(`AIM: setScenarioEndpoint config request`)
    const scenario = req.body.scenario
    if (typeof scenario === 'undefined') res.status(400).send({ message: 'Missing "scenario" key on the request body' })
    context.setSessionConfig(req, 'scenario', scenario)
    logger.yarn.status('config', `set [${chalk.yellow('setScenario')}] to ${chalk.yellow(scenario)}`, true)
    res.send({ status: 'OK', scenario })
  })
}
