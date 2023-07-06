import { Request, Response } from 'express'

import logger from '@vfuk/lib-aim-logger'

import configController from '@modules/configController'

import { MockData } from '@typesDef/mockData.types'

/**
 * Extend mock response
 * - used to add additional items to body or headers
 * @param req
 * @param res
 * @param cachedData
 * @returns
 */
export default async function extendMockResponse(req: Request, res: Response, cachedData: MockData) {
  // Get recording and mocking status
  const isRecordingEnabled = configController.getSessionConfig(req, 'recording')
  const isMockingEnabled = configController.getSessionConfig(req, 'mocking')
  // Ensure cacheMeta exists
  if (!cachedData?.__cacheMeta) cachedData.__cacheMeta = {}
  // Add custom headers
  if (cachedData?.__cacheMeta?.headers) {
    logger.group('cache').yarn.status('cachedData:adding headers', JSON.stringify(cachedData.__cacheMeta.headers), true)
    res.set({ ...cachedData.__cacheMeta.headers })
  }
  // Add session id into cache response for cache session id tracking purpose
  if (cachedData.__cacheMeta) cachedData.__cacheMeta.sessionId = req.session.id
  // Extend by mode if recording
  if (isRecordingEnabled && !isMockingEnabled) cachedData.__cacheMeta.mode = 'recording'
  // Extend by mode if mocking
  if (isMockingEnabled && !isRecordingEnabled) cachedData.__cacheMeta.mode = 'mocking'

  return cachedData
}
