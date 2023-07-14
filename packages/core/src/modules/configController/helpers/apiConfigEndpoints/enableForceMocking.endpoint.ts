import { Application } from 'express'

import type configController from '../../configController'

import genericEndpoint from './utils/generic.endpoint'

export default function enableForceMockingEndpoint(app: Application, context: typeof configController) {
  genericEndpoint(app, context, 'post', 'enableForceMocking', 'forceMocking', {
    errorMessage: 'Missing "enabled" key on the request body',
  })
}
