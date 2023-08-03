import md5 from 'blueimp-md5'
import isEmpty from 'lodash/isEmpty.js'
import logger from '@vodafoneuk/aim-mocking-logger'

import type { FilteredRequest } from '../getFilteredReq/getFilteredReq.types'

export default function getReqHash(req: FilteredRequest) {
  // Set default hash length
  const hashLength = 8
  // Set default hash, 000 means empty request without hash
  let hash = '000'
  // Create hash if body or query is not empty
  if (!isEmpty(req.body) || !isEmpty(req.query)) {
    hash = md5(JSON.stringify({ body: req.body, query: req.query })).substring(0, hashLength)
  }
  logger.group('cache').yarn.whisper(`hash is: ${hash} | body: ${JSON.stringify(req.body)} | query: ${JSON.stringify(req.query)}`)
  return hash
}
