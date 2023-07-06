import type { AimConfig } from '../../src/types/config.types'

const config: Partial<AimConfig> = {
  hashIgnoredReqPathPatterns: ['/api/ignored-url/*', '/api/ignored-url/*/id', '/api/ignored-url/*/id/*/id'],
  hashIgnoredReqBodyKeys: ['time', 'id'],
  hashIgnoredReqQueryKeys: ['time', 'id'],
  proxy: {
    '/api': {
      target: 'http://localhost:8090',
      secure: false,
      changeOrigin: true,
    },
  },
}

export default config
