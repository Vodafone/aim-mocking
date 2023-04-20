import type { Request } from 'express'

import sessionStore from '@modules/sessionStore'
import configController from '@modules/configController'

import encodeUrl from './utils/encodeUrl'

import getCachePrefixKey from '../getCachePrefixKey'
import getFilteredReq from '../getFilteredReq'
import type { FilteredRequest } from '../getFilteredReq/getFilteredReq.types'
import getReqHash from '../getReqHash'

export default function getCacheStorageKey(req: Request) {
  const scenario = sessionStore.get(req, 'scenario') || 'default'
  const rewriteMockPathNameFn = configController.config.rewriteMockPathName
  const prefixKey = getCachePrefixKey(req)
  // Filter request body, query and path to generate proper hash based on filtered values
  const filteredReq: FilteredRequest = getFilteredReq(req)
  // Get hash
  const hash = getReqHash(filteredReq)
  // Allow for path manipulation
  if (typeof rewriteMockPathNameFn === 'function') filteredReq.path = rewriteMockPathNameFn(filteredReq.path)
  // Return cache storage key
  return {
    scenario,
    filePath: `${filteredReq.method}/${prefixKey}${encodeUrl(filteredReq.path)}-${hash}`,
    scenarioFilePath: `${scenario}/${filteredReq.method}/${prefixKey}${encodeUrl(filteredReq.path)}-${hash}`,
  }
}
