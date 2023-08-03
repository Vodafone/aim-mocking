import logger from '@vodafoneuk/aim-mocking-logger'

import { AimConfig } from '@typesDef/config.types'

import validatorHashIgnoredReqPathPatterns from './validators/hashIgnoredReqPathPatterns'
import validatorApisConfigurationEndpointsPrefix from './validators/apisConfigurationEndpointsPrefix'

import { ConfigError } from './configValidator.types'

export default function configValidator(config: AimConfig) {
  logger.debug('setup').yarn.whisper('AIM: validate config')
  let errors: ConfigError[] = []
  // Run validators
  errors.push(validatorHashIgnoredReqPathPatterns(config))
  errors.push(validatorApisConfigurationEndpointsPrefix(config))
  // Remove empty elements
  errors = errors.filter((error) => error)
  // Check if there are any errors
  if (!errors.filter((err) => err.messages.length).length) return
  // if (!errors.length) return
  // Print errors and call process.exit
  logger.console.error('--------- AIM Config Error ---------')
  errors.forEach((validateError) => {
    if (validateError.messages.length) {
      validateError.messages.forEach((error) => {
        logger.yarn.failure(error.message, [`key: [${validateError.configKey}]`, `for [${error.location}]`])
      })
    }
  })
  process.exit()
}
