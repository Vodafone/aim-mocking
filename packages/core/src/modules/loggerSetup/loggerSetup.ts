import logger from '@vodafoneuk/lib-aim-logger'

import defaultAimConfig from '@config/defaultAimConfig'
import { AimConfig } from '@typesDef/config.types'

export default function loggerSetup(config: AimConfig) {
  const mergedDebugConfig = Object.assign({}, defaultAimConfig.debug, config.debug)
  Object.entries(mergedDebugConfig).forEach(([logKey, enabled]) => {
    if (enabled) {
      logger.debug(logKey).enable()
    }
  })
}
