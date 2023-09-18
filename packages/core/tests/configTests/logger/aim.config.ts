import type { AimConfig } from '../../../src/types/config.types'
const config: Partial<AimConfig> = {
  debug: {
    general: true,
    setup: true,
    cache: false,
    cacheDebug: true,
    config: true,
    autofix: false,
    onProxyRequest: true,
    onProxyRequestDebug: true,
    onProxyResponse: true,
    onProxyResponseDebug: true,
    onProxyError: false,
    configEndpoints: false,
    configEndpointsDebug: true,
    cacheController: false,
    fileInterface: false,
    scenarioList: true,
  },
  proxy: {
    '/api/test': {
      target: 'http://localhost:8090',
      secure: false,
      changeOrigin: true,
    },
  },
}

export default config
