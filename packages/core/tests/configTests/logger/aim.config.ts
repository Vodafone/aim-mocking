import type { AimConfig } from '../../../src/types/config.types'
const config: Partial<AimConfig> = {
  debug: {
    setup: true,
    cache: false,
    config: true,
    autofix: false,
    onProxyRequest: true,
    onProxyError: false,
    onProxyResponse: true,
    configEndpoints: false,
    cacheController: true,
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
