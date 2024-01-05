import path from 'path'

import { MockData } from '@typesDef/mockData.types'
import logger from '@vodafoneuk/aim-mocking-logger'
import fs from 'fs-extra'
import mkdirp from 'mkdirp'

import getMockFileFullPath from './utils/getMockFileFullPath'
import getMocksRootPath from './utils/getMocksRootPath'

export default class FileInterface {
  exists(mockRelativePath: string) {
    const rootDir = getMocksRootPath()
    const mockFilePath = getMockFileFullPath(rootDir, mockRelativePath)
    mkdirp.sync(path.dirname(mockFilePath))
    logger.debug('fileInterface').yarn.whisper(`exists check: ${mockFilePath}`)
    try {
      return fs.existsSync(mockFilePath)
    } catch (err) {
      logger.console.error(`not found: ${mockFilePath}.json`)
      return false
    }
  }

  rename(from: string, to: string) {
    const rootDir = getMocksRootPath()
    return fs.renameSync(getMockFileFullPath(rootDir, from), getMockFileFullPath(rootDir, to))
  }

  copy(from: string, to: string) {
    const rootDir = getMocksRootPath()
    return fs.copySync(getMockFileFullPath(rootDir, from), getMockFileFullPath(rootDir, to))
  }

  extendMockFileWithFilePath(mockFilePath: string, data: MockData) {
    if (!data?.__cacheMeta) data.__cacheMeta = {}
    data.__cacheMeta.filePath = path.relative(process.cwd(), mockFilePath)
    return data
  }

  get(mockRelativePath: string): MockData {
    const rootDir = getMocksRootPath()
    const mockFilePath = getMockFileFullPath(rootDir, mockRelativePath)
    mkdirp.sync(path.dirname(mockFilePath))
    if (fs.existsSync(mockFilePath)) {
      return this.extendMockFileWithFilePath(mockFilePath, JSON.parse(fs.readFileSync(mockFilePath, 'utf-8')))
    }
    return null
  }

  save(mockRelativePath: string, data: unknown, silent = false) {
    const rootDir = getMocksRootPath()
    const mockFilePath = getMockFileFullPath(rootDir, mockRelativePath)
    mkdirp.sync(path.dirname(mockFilePath))
    if (!silent) logger.console.info(`cached saved as: ${mockFilePath}`)
    fs.writeFileSync(mockFilePath, JSON.stringify(data, null, 2), 'utf-8')
  }
}
