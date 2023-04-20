import type { AimConfig } from '../../src/types/config.types'

const config: Partial<AimConfig> = {
  proxy: {
    '/api/test': {
      target: 'http://localhost:8090',
      secure: false,
      changeOrigin: true,
    },
  },
}

export default config
