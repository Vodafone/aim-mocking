import { Application } from 'express'

import type configController from '../../configController'

import genericEndpoint from './utils/generic.endpoint'

export default function enableMockingEndpoint(app: Application, context: typeof configController) {
  genericEndpoint(app, context, 'post', 'enableMocking', 'mocking', {
    errorMessage: 'Missing "enabled" key on the request body',
  })
}
