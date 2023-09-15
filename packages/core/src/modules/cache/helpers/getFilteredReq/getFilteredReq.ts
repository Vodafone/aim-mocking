import type { Request } from 'express'
import logger from '@vodafoneuk/aim-mocking-logger'

import filterReqBodyKeys from './utils/filterReqBodyKeys'
import filterReqQueryKeys from './utils/filterReqQueryKeys'
import filterReqPath from './utils/filterReqPath'

import type { FilteredRequest } from './getFilteredReq.types'

export default function getFilteredReqHash(req: Request): FilteredRequest {
  let filteredReq: FilteredRequest = { method: req.method, path: req.path, body: req.body, query: req.query }
  // Filter request before we can generate hash
  // Filter body req keys
  logger.debug('cacheDebug').yarn.whisper(`req filter body`)
  filteredReq = filterReqBodyKeys(filteredReq)
  // Filter query req keys
  logger.debug('cacheDebug').yarn.whisper(`req filter query`)
  filteredReq = filterReqQueryKeys(filteredReq)
  // Filter req path
  logger.debug('cacheDebug').yarn.whisper(`req filter path`)
  return filterReqPath(filteredReq)
}
