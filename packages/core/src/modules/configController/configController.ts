import { Application, Request } from 'express'
import merge from 'lodash/merge.js'
import defaultAimConfig from '@config/defaultAimConfig'
import type { AimConfig } from '@typesDef/config.types'
import logger from '@vodafoneuk/lib-aim-logger'

import sessionStore from '../sessionStore'

import endpointHealth from './helpers/apiConfigEndpoints/health.endpoint'
import enableMockingEndpoint from './helpers/apiConfigEndpoints/enableMocking.endpoint'
import enableForceMocking from './helpers/apiConfigEndpoints/enableForceMocking.endpoint'
import enableAutofixEndpoint from './helpers/apiConfigEndpoints/enableAutofix.endpoint'
import enableCacheUpdateEndpoint from './helpers/apiConfigEndpoints/enableCacheUpdate.endpoint'
import enableRecordingEndpoint from './helpers/apiConfigEndpoints/enableRecording.endpoint'
import setScenarioEndpoint from './helpers/apiConfigEndpoints/setScenario.endpoint'
import getScenarioEndpoint from './helpers/apiConfigEndpoints/getScenario.endpoint'
import getConfigOptionEndpoint from './helpers/apiConfigEndpoints/getConfigOption.endpoint'
import getScenariosListEndpoint from './helpers/apiConfigEndpoints/getScenariosList'

export class ConfigController {
  config: AimConfig = defaultAimConfig

  updateConfig(aimConfig: AimConfig) {
    logger.debug('setup').yarn.whisper('AIM: update config')
    this.config = merge({}, this.config, aimConfig)
    logger.debug('config').yarn.whisper(JSON.stringify(this.config, null, 2))
  }

  setSessionConfig(req: Request, key: string, value: string | boolean | number) {
    sessionStore.set(req, key, value)
  }

  getSessionConfig(req: Request, key: string) {
    return sessionStore.get(req, key)
  }

  setupConfigEndpoints(app: Application) {
    logger.debug('setup').yarn.whisper('AIM: setup config endpoints')
    endpointHealth(app, this)
    enableMockingEndpoint(app, this)
    enableForceMocking(app, this)
    enableAutofixEndpoint(app, this)
    enableCacheUpdateEndpoint(app, this)
    enableRecordingEndpoint(app, this)
    setScenarioEndpoint(app, this)
    getScenarioEndpoint(app, this)
    setScenarioEndpoint(app, this)
    getConfigOptionEndpoint(app, this)
    getScenariosListEndpoint(app, this)
  }
}

export default new ConfigController()
