import logger from '@vodafoneuk/aim-mocking-logger'
import type { Request } from 'express'

import extendCacheData from './helpers/extendCacheData'
import getCacheStorageFallbackKey from './helpers/getCacheStorageFallbackKey'
import getCacheStorageKey from './helpers/getCacheStorageKey'

import { MockData } from '@typesDef/mockData.types'

import FileInterface from '@storageInterfaces/file'

export class Cache {
  public storageInterface: InstanceType<typeof FileInterface> = null

  use(StorageInterface: typeof FileInterface) {
    this.storageInterface = new StorageInterface()
  }

  /**
   * Get cache file path
   * @param req
   * @returns
   */
  async getCacheFilePath(req: Request) {
    const cacheStorageKey = getCacheStorageKey(req)
    return cacheStorageKey.scenarioFilePath
  }

  /**
   * Check if cache item exists
   * @param {*} req
   */
  async exists(req: Request) {
    // Try default cache resolution
    const cacheStorageKey = getCacheStorageKey(req)
    const cacheExists = this.storageInterface.exists(cacheStorageKey.scenarioFilePath)
    if (cacheExists) {
      logger.debug('cache').yarn.whisper(`mock file exists: ${cacheStorageKey.scenarioFilePath}`)
      return true
    } else {
      const expectedCacheFilePath = await this.getCacheFilePath(req);
      logger.debug("cache").yarn.failure(`mock file not found!: ${expectedCacheFilePath}.json`);
    }

    // Try shared fallback resolution
    const cacheStorageFallbackKey = await getCacheStorageFallbackKey(cacheStorageKey.filePath, cacheStorageKey.scenarioFilePath)
    if (cacheStorageFallbackKey) {
      const cacheFallbackExists = this.storageInterface.exists(cacheStorageFallbackKey)
      if (cacheFallbackExists) {
        logger.debug('cache').yarn.whisper(`fallback mock file exists: ${cacheStorageFallbackKey}`)
        return true
      }
    }

    return false
  }

  async retrieve(req: Request) {
    // Try default cache resolution
    const cacheStorageKey = getCacheStorageKey(req)
    const cacheExists = this.storageInterface.exists(cacheStorageKey.scenarioFilePath)
    if (cacheExists) {
      const mockFileContent = this.storageInterface.get(cacheStorageKey.scenarioFilePath)
      logger.debug('general').yarn.whisper(`serve mock file: ${mockFileContent.__cacheMeta.filePath}`)
      logger.debug('general').yarn.success('Returned mocked file:', mockFileContent.__cacheMeta.filePath)
      return mockFileContent
    }
    // Try shared fallback resolution
    const cacheStorageFallbackKey = await getCacheStorageFallbackKey(cacheStorageKey.filePath, cacheStorageKey.scenarioFilePath)
    if (cacheStorageFallbackKey) {
      const cacheFallbackExists = this.storageInterface.exists(cacheStorageFallbackKey)
      if (cacheFallbackExists) {
        const mockFileContent = this.storageInterface.get(cacheStorageFallbackKey)
        logger.debug('general').yarn.whisper(`serve mock file: ${mockFileContent.__cacheMeta.filePath}`)
        logger.debug('general').yarn.success('Returned mocked file:', mockFileContent.__cacheMeta.filePath)
        return mockFileContent
      }
    }
  }

  /**
   * Store new cached item
   * @param {*} req
   * @param {*} res
   */
  async store(req: Request, mockData: MockData, statusCode: number) {
    const cacheStorageKey = getCacheStorageKey(req)
    logger.yarn.status('cache:store', 'storing cache', true)
    logger.console.debug(`for: ${req.path}`)
    logger.console.debug(`status: ${statusCode}`)
    this.storageInterface.save(cacheStorageKey.scenarioFilePath, extendCacheData(req, mockData, { statusCode }))
  }

  /**
   * Update mock
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async update(req: Request) {
    const cacheStorageKey = getCacheStorageKey(req)
    // get current mock data from the file
    const mockData = this.storageInterface.get(cacheStorageKey.scenarioFilePath)
    // If no data, return
    if (!mockData) return
    // Get updated cache data by extending it with meta data
    const updatedCacheData = extendCacheData(req, mockData)
    // If nothing to update, return
    if (!updatedCacheData) return
    // Update mock
    this.storageInterface.save(cacheStorageKey.scenarioFilePath, extendCacheData(req, mockData), true)
  }
}

export default new Cache()
