import path from 'path'

import fs from 'fs-extra'
import mkdirp from 'mkdirp'
import logger from '@vfuk/lib-aim-logger'
import { MockData } from '@typesDef/mockData.types'

import getMocksRootPath from './utils/getMocksRootPath'
import getMockFileFullPath from './utils/getMockFileFullPath'

export default class FileInterface {
  exists(mockRelativePath: string) {
    const rootDir = getMocksRootPath()
    const mockFilePath = getMockFileFullPath(rootDir, mockRelativePath)
    mkdirp.sync(path.dirname(mockFilePath))
    logger.debug('fileInterface').yarn.whisper(`exists check: ${mockFilePath}`)
    try {
      return fs.existsSync(mockFilePath)
    } catch (err) {
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

  get(mockRelativePath: string): MockData {
    const rootDir = getMocksRootPath()
    const mockFilePath = getMockFileFullPath(rootDir, mockRelativePath)
    mkdirp.sync(path.dirname(mockFilePath))
    if (fs.existsSync(mockFilePath)) {
      return JSON.parse(fs.readFileSync(mockFilePath, 'utf-8'))
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
