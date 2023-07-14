// @ts-nocheck
import express from 'express'
import bodyParser from 'body-parser'

import AimMiddleware from '../../dist/index.mjs'

function mockedServiceServer() {
  const app = express()
  app.use(bodyParser.json())
  app.mode = 200
  try {
    AimMiddleware(app, {
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
      },
      ignoredPaths: [],
      apisConfigurationEndpointsPrefix: '/AIM_API',
      hashIgnoredReqBodyKeys: ['customerRequestedDate', 'time'],
      hashIgnoredReqQueryKeys: ['perpage'],
      hashIgnoredReqPathPatterns: ['/microsite/api/time/*/test', '/microsite/api/time/*/data/*/test'],
      rewriteMockPathName: null,
      storageInterface: 'file',
      storageInterfaceRootPath: '',
      enableAutofix: false,
      proxy: {
        '/api': {
          target: 'http://localhost:8090',
          secure: false,
          changeOrigin: true,
          logLevel: 'silent',
        },
      },
    })
  } catch (err) {
    console.log(err)
  }
  console.log('start server...')
  app.listen(8000, () => {
    console.log('running!')
  })
}

mockedServiceServer()
