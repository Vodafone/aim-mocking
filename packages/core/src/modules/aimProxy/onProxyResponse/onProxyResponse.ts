import { Request, Response } from 'express'
// @ts-ignore
import modifyResponse from 'node-http-proxy-json'

import logger from '@vfuk/lib-aim-logger'

import configController from '@modules/configController'
import cacheController from '@modules/cacheController'
import isExcludedPath from '../onProxyRequest/utils/isExcludedPath'

export default function onProxyResponse(proxyRes: Response, req: Request, res: Response) {
  logger.debug('onProxyResponse').yarn.whisper(`AIM: incoming proxy response`)
  if (isExcludedPath(req.url)) return
  logger.group('request').yarn.info('AIM', 'onProxyRes')
  logger.group('request').yarn.whisper(`"${req.method}" for "${req.path}" at code "${res.statusCode}"`)
  // Do not even use modify response if no recording or mocking
  // This is to prevent AIM breaking some kind of responses eg: arraybuffer
  const isRecordingEnabled = configController.getSessionConfig(req, 'recording')
  const isMockingEnabled = configController.getSessionConfig(req, 'mocking')
  logger.group('request').yarn.info('AIM', `onProxyRes: R:${isRecordingEnabled} && M:${isMockingEnabled}`)
  if (!isRecordingEnabled && !isMockingEnabled) {
    logger.console.warn('AIM', 'mocking and recording are disabled - skip')
    return
  }
  logger.group('request').flush()
  // intercept body response
  modifyResponse(res, proxyRes, async (body: Record<string, string>) => {
    logger.debug('onProxyResponse').yarn.whisper(`AIM: incoming proxy response: modifyResponse`)
    // fix empty body requests
    if (!body) body = {}
    // Enforce json response type
    res.type('json')
    // Return response
    return cacheController(req, res, body)
  })
}
