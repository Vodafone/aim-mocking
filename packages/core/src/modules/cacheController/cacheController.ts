// @ts-nocheck
import logger from '@vodafoneuk/aim-mocking-logger'
import { Request, Response } from 'express'

import cache from '@modules/cache'
import configController from '@modules/configController'

import extendMockResponse from './helpers/extendMockResponse'
import isSuccessStatus from './utils/isSuccessStatus'
import sendResponse from './utils/sendResponse'
import wait from './utils/wait'

export default async function cacheController(req: Request, res: Response, body: unknown) {
  const isRecordingEnabled = configController.getSessionConfig(req, 'recording')
  const isMockingEnabled = configController.getSessionConfig(req, 'mocking')

  // If mocking and recording enabled at the same time
  if (isRecordingEnabled && isMockingEnabled) {
    logger.console.warn('AIM', 'DISABLED - mocking and recording cannot be enabled at the same time')
    return sendResponse(res, body, 400)
  }

  // If response success or error
  // - and if recording is enabled
  // - we don't need to check if response is successful or not since recording works for both
  if (isRecordingEnabled) {
    logger.console.warn('AIM', 'starting to record the response')
    const cacheExists = await cache.exists(req)
    const isForceCacheUpdate = configController.getSessionConfig(req, 'updateCache')
    // If cache exists but force update has not been set - do nothing
    if (cacheExists && !isForceCacheUpdate) {
      logger.debug('cache').yarn.whisper(`cache already exists`)
      logger.debug('cache').yarn.whisper(`returning existing cache data`)
      // If cache already exists and was not updated
      // We return the mock response instead of original response
      // We can't use status driven response in that case!
      // We want to return a mock instead of original response when recording to confirm what was recorded
      body = await cache.retrieve(req)
      body = await extendMockResponse(req, res, body)
      return body
    }
    logger.yarn.status('cache:update', 'cache has been updated', true)
    // Save new mocks
    await cache.store(req, body, res.statusCode)
    // We want to return a mock instead of original response when recording to confirm what was recorded
    body = await cache.retrieve(req)
    body = await extendMockResponse(req, res, body)
    return body
  }

  // If response error
  // do nothing and return original body response
  if (!isSuccessStatus(res.statusCode) && !isMockingEnabled) {
    logger.console.warn('AIM', 'mocking is disabled')
    return body
  }

  // If response success
  // serve mocks instead of original response
  let status = 200
  const cacheExists = await cache.exists(req)
  // Add request as to a track list
  // TODO: aufotifx temporarly disabled
  // hashAutoFix.track(req)
  // return original response if no mock exists
  if (!cacheExists) {
    const expectedCacheFilePath = await cache.getCacheFilePath(req)
    logger.group('general').yarn.status('cache:retrieve', 'no cache exist', false)
    if (expectedCacheFilePath) {
      logger.group('general').yarn.warn('cache:error', `Mock file not found, create in: ${expectedCacheFilePath}`)
    }
    return sendResponse(res, body, 400)
  }

  // Update mock with meta
  await cache.update(req, res)
  res.statusCode = 200
  // Retrieve cache data
  let cachedData = await cache.retrieve(req)
  // Extend mock data
  cachedData = await extendMockResponse(req, res, cachedData)
  // Delay api response
  if (cachedData.__cacheMeta && cachedData.__cacheMeta.delay) await wait(cachedData.__cacheMeta.delay)
  // handle status driven responses
  if (cachedData?.__cacheMeta?.status) status = cachedData.__cacheMeta.status
  // If no body, this is a proxy error request, and we need to send instead of returning
  if (body === null) {
    logger.group('cache').yarn.status('cache:retrieve', `cache served [status: ${status}]`, true)
    logger.group('cache').flush()
    return res.status(status).send(cachedData)
  }

  return cachedData
}
