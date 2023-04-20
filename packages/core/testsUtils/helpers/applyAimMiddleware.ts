import merge from 'lodash/merge'

import Aim from '../../../src/aim/proxy'
import server from '../server'
import testsConfig from '../config/config'

export default function applyAimMiddleware(config) {
  return Aim(server, {
    debug: false,
    silent: true,
    endpointUrlPrefix: '/api',
    proxy: config.proxy,
    cache: merge(
      {
        updateCache: false, // should existing cache be updated
        storageInterface: 'file', // which storage interface should be used. Available: 'file'
        storageInterfaceOptions: {
          // file interface options - only if using file interface
          rootPath: testsConfig.rootPath,
        },
      },
      config.cache,
    ),
  })
}
