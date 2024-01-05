import { Request, Response } from 'express'
// @ts-ignore
import modifyResponse from 'node-http-proxy-json'

import logger from '@vodafoneuk/aim-mocking-logger'

import configController from '@modules/configController'
import cacheController from '@modules/cacheController'
import isExcludedPath from '../onProxyRequest/utils/isExcludedPath'

export default function onProxyResponse(proxyRes: Response, req: Request, res: Response) {
  logger.debug('onProxyResponse').yarn.whisper(`responding to: ${req.method}:${req.path} | ${res.statusCode}`)
  if (isExcludedPath(req.url)) return
  // Do not even use modify response if no recording or mocking
  // This is to prevent AIM breaking some kind of responses eg: arraybuffer
  const isRecordingEnabled = configController.getSessionConfig(req, 'recording')
  const isMockingEnabled = configController.getSessionConfig(req, 'mocking')
  logger.debug('general').yarn.whisper(`Recording: ${isRecordingEnabled} | Mocking: ${isMockingEnabled}`)
  if (!isRecordingEnabled && !isMockingEnabled) {
    logger.console.warn('AIM disabled', 'mocking and recording are disabled')
    return
  }

  // intercept body response
  modifyResponse(res, proxyRes, async (body: Record<string, string>) => {
    logger.debug('onProxyResponseDebug').yarn.whisper(`incoming proxy response: modifyResponse`)
    // fix empty body requests
    if (!body) body = {}
    // Enforce json response type
    res.type('json')
    // Return response
    return cacheController(req, res, body)
  })
}
