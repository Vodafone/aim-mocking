// @ts-nocheck
import express from 'express'
import bodyParser from 'body-parser'
import merge from 'lodash/merge'

import defaultAimConfig from '../../tests/defaultAimConfig'
import handleTestedEndpointResponse from './utils/handleTestedEndpointResponse'

import AimMiddleware from '../../src/index'

export default function mockedServiceServer(aimConfig) {
  const app = express()
  app.use(bodyParser.json())
  app.mode = 200
  AimMiddleware(app, merge({}, defaultAimConfig, aimConfig))
  app.get('/api/*', handleTestedEndpointResponse(app))
  app.post('/api/*', handleTestedEndpointResponse(app))
  return app
}
