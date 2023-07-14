import config from '../testsUtils/config/config'

import type { AimConfig } from '../src/types/config.types'

const defaultAimConfig: Partial<AimConfig> = {
  debug: {
    setup: true,
    cache: true,
    config: true,
    autofix: true,
    onProxyRequest: true,
    onProxyError: true,
    onProxyResponse: true,
    configEndpoints: true,
    cacheController: true,
    fileInterface: true,
    scenarioList: true,
  },
  ignoredPaths: [],
  apisConfigurationEndpointsPrefix: '/AIM_API',
  hashIgnoredReqBodyKeys: [],
  hashIgnoredReqQueryKeys: [],
  hashIgnoredReqPathPatterns: [],
  rewriteMockPathName: null,
  storageInterface: 'file',
  storageInterfaceRootPath: config.rootPath,
  enableAutofix: false,
}

export default defaultAimConfig
