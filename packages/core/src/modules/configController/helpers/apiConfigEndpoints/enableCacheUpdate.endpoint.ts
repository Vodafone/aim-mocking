import { Application } from 'express'

import type configController from '../../configController'

import genericEndpoint from './utils/generic.endpoint'

export default function enableCacheUpdateEndpoint(app: Application, context: typeof configController) {
  genericEndpoint(app, context, 'post', 'enableCacheUpdate', 'updateCache', {
    errorMessage: 'Missing "enabled" key on the request body',
  })
}
