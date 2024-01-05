import logger from '@vodafoneuk/aim-mocking-logger'
import isEmpty from 'lodash/isEmpty.js'
import get from 'lodash/get.js'
import unset from 'lodash/unset.js'

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
    // Lodash 'get' adds support for nested config keys eg `"customer.data.name"`
    if (typeof get(req.body, ignoredKey) !== 'undefined') {
      logger.debug('cache').yarn.whisper(`delete body key: ${ignoredKey}`)
      unset(req.body, ignoredKey)
    }
  }
  return req
}
