import { AimConfig } from '@typesDef/config.types'

import { ConfigError } from '../configValidator.types'

export default function validatorApisConfigurationEndpointsPrefix(config: AimConfig) {
  const errors: ConfigError = {
    configKey: 'apisConfigurationEndpointsPrefix',
    messages: [],
  }

  // Allow for empty undefined
  if (typeof config.apisConfigurationEndpointsPrefix === 'undefined') return

  // No empty
  if (!config.apisConfigurationEndpointsPrefix) {
    errors.messages.push({
      location: 'generic',
      message: 'should not be empty',
    })
  }

  // Start with "/"
  if (!/^\//.test(config.apisConfigurationEndpointsPrefix)) {
    errors.messages.push({
      location: 'generic',
      message: 'should start with "/"',
    })
  }

  return errors
}
