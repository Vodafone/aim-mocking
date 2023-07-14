import type { Application } from 'express'
import bodyParser from 'body-parser'
import logger from '@vodafoneuk/lib-aim-logger'

import type { AimConfig } from '@typesDef/config.types'

import sessionStore from './modules/sessionStore'
import cache from './modules/cache'
import fileInterface from './storageInterfaces/file'
import configValidator from './helpers/configValidator'
import configController from './modules/configController'
import * as aimProxy from './modules/aimProxy/setupProxy/setupProxy'
import loggerSetup from './modules/loggerSetup'
// import hashAutofix from './modules/hashAutoFix'

/**
 * Aim proxy middleware
 * - for webpack-dev-server proxy usage
 * - should work with express proxy
 */
class AimProxyMiddleware {
  middleware(app: Application, proxyConfig: AimConfig) {
    logger.yarn.appStart(() => 'AIM middleware')
    loggerSetup(proxyConfig)
    logger.debug('setup').yarn.whisper('AIM: register middleware')
    // Validate config
    configValidator(proxyConfig)
    // Initialize session store to handle user specific config sessions
    // Needs to be initialize before anything else
    sessionStore.setup(app)
    // Setup config controller and config endpoints
    configController.updateConfig(proxyConfig)
    configController.setupConfigEndpoints(app)
    // setup cache file interface
    cache.use(fileInterface)
    app.use(bodyParser.json())
    aimProxy.setupProxy(app)
    logger.debug().yarn.whisper('AIM: register middleware: end')
  }
}

const apiInterceptorMiddleware = new AimProxyMiddleware()
export default apiInterceptorMiddleware.middleware.bind(apiInterceptorMiddleware)
