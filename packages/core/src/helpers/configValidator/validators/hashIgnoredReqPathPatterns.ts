import { AimConfig } from '@typesDef/config.types'

import { ConfigError } from '../configValidator.types'

export default function validateHashIgnoredReqPathPatterns(config: AimConfig): ConfigError {
  const errors: ConfigError = {
    configKey: 'hashIgnoredReqPathPatterns',
    messages: [],
  }

  // Allow for empty undefined
  if (typeof config.hashIgnoredReqPathPatterns === 'undefined') return

  // Check if hashIgnoredReqPathPatterns is an array
  if (!Array.isArray(config.hashIgnoredReqPathPatterns)) {
    errors.messages.push({
      location: 'generic',
      message: 'should be an array',
    })
    return errors
  }
  // Check each entry
  for (const pattern of config.hashIgnoredReqPathPatterns) {
    // should start with /
    if (!/^\//.test(pattern)) {
      errors.messages.push({
        location: pattern,
        message: 'hashIgnoredPathPatterns should start with slash eg "/api"',
      })
    }

    // should not end with /
    if (/\/$/.test(pattern)) {
      errors.messages.push({
        location: pattern,
        message: 'hashIgnoredPathPatterns should not end with slash eg "...devices/"',
      })
    }

    // should not have double slashes ( // )
    if (/\/\//.test(pattern)) {
      errors.messages.push({
        location: pattern,
        message: 'hashIgnoredPathPatterns should not have double slashes eg "api//devices"',
      })
    }
  }

  return errors
}
