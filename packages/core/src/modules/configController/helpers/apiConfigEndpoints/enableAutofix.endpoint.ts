import { Application } from 'express'

import type configController from '../../configController'

import genericEndpoint from './utils/generic.endpoint'

export default function enableAutofixEndpoint(app: Application, context: typeof configController) {
  genericEndpoint(app, context, 'post', 'enableAutofix', 'autofix', {
    errorMessage: 'Missing "enabled" key on the request body',
  })
}
