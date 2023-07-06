import { Application } from 'express'

import type configController from '../../configController'

import genericEndpoint from './utils/generic.endpoint'

export default function enableRecordingEndpoint(app: Application, context: typeof configController) {
  genericEndpoint(app, context, 'post', 'enableRecording', 'recording', {
    errorMessage: 'Missing "enabled" key on the request body',
  })
}
