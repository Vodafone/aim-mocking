import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '@modules/configController'

export default function isExcludedPath(url: string) {
  if (!configController.config.ignoredPaths) return false
  for (const path of configController.config.ignoredPaths) {
    if (url.match(path)) {
      logger.debug('onProxyRequestDebug').yarn.whisper(`isExcludedPath: ${path} excluded`)
      return true
    }
  }
  return false
}
