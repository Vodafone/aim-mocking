import logger from '@vodafoneuk/lib-aim-logger'
import isEmpty from 'lodash/isEmpty.js'

import configController from '@modules/configController'

import type { FilteredRequest } from '../../getFilteredReq.types'

export default function filterReqBodyKeys(req: FilteredRequest): FilteredRequest {
  const hashIgnoredReqBodyKeys = configController.config.hashIgnoredReqBodyKeys
  // no hashIgnoredKeys, skip
  if (!hashIgnoredReqBodyKeys || !hashIgnoredReqBodyKeys.length) return req
  // if no body
  if (isEmpty(req.body)) return req
  // iterate every body data key
  for (const ignoredKey of hashIgnoredReqBodyKeys) {
    if (typeof req.body[ignoredKey] !== 'undefined') {
      logger.debug('cache').yarn.whisper(`delete body key: ${ignoredKey}`)
      delete req.body[ignoredKey]
    }
  }
  return req
}
