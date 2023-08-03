import { AimConfig } from '@vodafoneuk/aim-mocking'

const debugAll = false

export default {
  debug: {
    setup: debugAll,
    cache: debugAll,
    config: debugAll,
    autofix: debugAll,
    onProxyRequest: debugAll,
    onProxyError: debugAll,
    onProxyResponse: debugAll,
    configEndpoints: debugAll,
    cacheController: debugAll,
    fileInterface: debugAll,
    scenarioList: debugAll,
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
