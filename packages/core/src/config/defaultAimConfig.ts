import { AimConfig } from '@typesDef/config.types'

const defaultAimConfig: AimConfig = {
  debug: {
    setup: false,
    cache: false,
    config: false,
    autofix: false,
    onProxyRequest: false,
    onProxyError: false,
    onProxyResponse: false,
    configEndpoints: false,
    cacheController: false,
    fileInterface: false,
    scenarioList: false,
  },
  ignoredPaths: [],
  apisConfigurationEndpointsPrefix: '/AIM_API',
  proxy: {},
  hashIgnoredReqBodyKeys: [],
  hashIgnoredReqQueryKeys: [],
  hashIgnoredReqPathPatterns: [],
  rewriteMockPathName: null,
  storageInterface: 'file' as const,
  storageInterfaceRootPath: '__mockapi__',
  enableAutofix: false,
}

export default defaultAimConfig
