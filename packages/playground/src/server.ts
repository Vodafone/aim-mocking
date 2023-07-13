import newman from 'newman'
import express from 'express'
import proxy from 'express-http-proxy'
import open from 'open'

import AimMiddleware from '@vodafoneuk/lib-web-aim'
import aimConfig from './aim.config'

import collection from './AIM.postman_collection.json' assert { type: 'json' }

export default function server() {
  const app = express()

  AimMiddleware(app, {
    // Import part of the config from a config file
    // To keep the example server as simple as possible
    ...aimConfig,
    // Setup proxy
    proxy: {
      '/api': {
        // Ask aim to proxy back to your own server
        // This is useful if you want to use your own proxy instead of AIM
        // which will be removed in production code
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  })

  // Proxy to backend apis ( datausa as an example )
  app.use('/api', proxy('https://datausa.io'))

  app.use('/', express.static('dist/public'))

  app
    .listen(3000, () => {
      console.log('server running at http://localhost:3000')
      open(`http://localhost:3000`)
    })
    .on('error', function (err) {
      console.error(err)
    })
    .on('listening', function () {
      newman.run(
        {
          collection,
          reporters: 'cli',
        },
        function (err) {
          if (err) {
            throw err
          }
        },
      )
    })
}
