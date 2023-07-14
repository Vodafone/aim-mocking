/* eslint-disable no-shadow */
import type { Request } from 'express'
import path from 'path'
import fs from 'fs'
import walk from 'walk'
import logger from '@vodafoneuk/lib-aim-logger'

import configController from '@modules/configController'

function rmHash(value: string) {
  return value.replace(/([a-zA-Z0-9]+)$/, '')
}

export default function autofixHash(req: Request, root: string, storageKey: string, scenarioPath: string) {
  // Prevent aim crashing if scenario not selected
  if (!scenarioPath || !storageKey) return
  const absScenarioPath = path.resolve(process.cwd(), root, scenarioPath)
  const absStorageKey = path.resolve(process.cwd(), root, storageKey)
  const absParsedStorageKey = path.parse(absStorageKey)
  const relStorageKeyWithoutHash = rmHash(absParsedStorageKey.name)
  const storageKeyHash = storageKey.match(/([a-zA-Z0-9]+)$/)?.[0] || null
  const foundMatchingFiles: string[] = []
  logger.debug('autofix').yarn.whisper(`exists: absScenarioPath: ${absScenarioPath}`)
  logger.debug('autofix').yarn.whisper(`exists: absStorageKey: ${absStorageKey}`)
  logger.debug('autofix').yarn.whisper(`exists: absParsedStorageKey: ${absParsedStorageKey}`)
  logger.debug('autofix').yarn.whisper(`exists: relStorageKeyWithoutHash: ${relStorageKeyWithoutHash}`)
  logger.debug('autofix').yarn.whisper(`exists: storageKeyHash: ${storageKeyHash}`)
  logger.debug('autofix').yarn.whisper(`exists: foundMatchingFiles: ${foundMatchingFiles}`)
  walk.walkSync(absScenarioPath, {
    listeners: {
      file: function (root, fileStats) {
        const absParsedMockFile = path.parse(path.resolve(root, fileStats.name))
        const relMockFileWithoutHash = rmHash(absParsedMockFile.name)
        if (relMockFileWithoutHash === relStorageKeyWithoutHash) {
          foundMatchingFiles.push(path.resolve(absParsedMockFile.dir, absParsedMockFile.name))
        }
      },
    },
  })

  if (foundMatchingFiles.length === 1) {
    const newHash = storageKeyHash
    const oldFileName = foundMatchingFiles[0]
    const newFileName = oldFileName.replace(/([a-zA-Z0-9]+)$/, newHash)
    logger.group('autofix').yarn.whisper('Autofix fixed AIM hash for:')
    logger.group('autofix').yarn.whisper(`old file: ${oldFileName}.json`)
    logger.group('autofix').yarn.whisper(`new file: ${newFileName}.json`)
    if (!configController.getSessionConfig(req, 'autofix')) {
      logger.group('autofix').console.warn('autofix is disabled - no changes where made')
      logger.group('autofix').flush()
      return
    }
    logger.group('autofix').console.info('Autofix fixed broken mocks (reload the page)')
    logger.group('autofix').flush()
    fs.renameSync(`${oldFileName}.json`, `${newFileName}.json`)
  }
}
