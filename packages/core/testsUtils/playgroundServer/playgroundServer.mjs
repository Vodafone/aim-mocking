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
        general: true,
        setup: true,
        cache: true,
        cacheDebug: true,
        config: true,
        autofix: true,
        onProxyRequest: true,
        onProxyRequestDebug: true,
        onProxyResponse: true,
        onProxyResponseDebug: true,
        onProxyError: true,
        configEndpoints: true,
        configEndpointsDebug: true,
        cacheController: true,
        fileInterface: true,
        scenarioList: true,
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
