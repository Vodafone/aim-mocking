import { AimConfig } from '@vodafoneuk/aim-mocking'

const enableDebugLog = true
const enableDetailedDebugLog = false

export default {
  debug: {
    general: true,
    setup: enableDebugLog,
    cache: enableDebugLog,
    cacheDebug: enableDetailedDebugLog,
    config: enableDebugLog,
    autofix: enableDebugLog,
    onProxyRequest: enableDebugLog,
    onProxyRequestDebug: enableDetailedDebugLog,
    onProxyResponse: enableDebugLog,
    onProxyResponseDebug: enableDebugLog,
    onProxyError: enableDetailedDebugLog,
    configEndpoints: enableDebugLog,
    configEndpointsDebug: enableDetailedDebugLog,
    cacheController: enableDebugLog,
    fileInterface: enableDetailedDebugLog,
    scenarioList: enableDetailedDebugLog,
  },
  ignoredPaths: [],
  hashIgnoredReqBodyKeys: ['customerId', 'time'],
  hashIgnoredReqQueryKeys: ['perpage'],
  hashIgnoredReqPathPatterns: [],
  rewriteMockPathName: (requestPath: string) => {
    // Remove dual `api-api` from mock file path
    // so instead of: `api-api-data-4c1a80fd.json`
    // we will get: `api-data-4c1a80fd.json`
    return requestPath.replace(/api\//, '')
  },
  proxy: {},
} as AimConfig
