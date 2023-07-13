import logger from '@vodafoneuk/lib-aim-logger'
import isEmpty from 'lodash/isEmpty.js'

import configController from '@modules/configController'

import type { FilteredRequest } from '../../getFilteredReq.types'

export default function filterReqQueryKeys(req: FilteredRequest): FilteredRequest {
  const hashIgnoredKeys = configController.config.hashIgnoredReqQueryKeys
  // if no ignored path patterns, skip
  if (!hashIgnoredKeys || !hashIgnoredKeys.length) return req
  // if no query keys
  if (isEmpty(req.query)) return req
  // iterate through ignored patterns
  for (const ignoredKey of hashIgnoredKeys) {
    if (typeof req.query[ignoredKey] !== 'undefined') {
      logger.debug('cache').yarn.whisper(`delete query key: ${ignoredKey}`)
      delete req.query[ignoredKey]
    }
  }
  return req
}
