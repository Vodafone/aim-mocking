import { Request, Response } from 'express'

import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '@modules/configController'
import cacheController from '@modules/cacheController'

export default async function onProxyError(err: unknown, req: Request, res: Response) {
  logger.debug('onProxyError').yarn.whisper(`AIM: incoming request error`)
  if (!configController.getSessionConfig(req, 'mocking')) {
    logger.console.warn('AIM', 'mocking is disabled')
    res.status(404).end()
    return
  }
  await cacheController(req, res, null)
}
