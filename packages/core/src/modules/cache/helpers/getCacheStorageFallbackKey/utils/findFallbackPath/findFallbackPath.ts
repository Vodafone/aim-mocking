import path from 'path'
import fs from 'fs'

import logger from '@vodafoneuk/lib-aim-logger'

import configController from '@modules/configController'

export default async function findScenarioFallbackPath(scenarioFilePath: string): Promise<string> {
  const rootPath = configController.config.storageInterfaceRootPath
  // Go back one level from given path
  // We are trying to go back as long as we don't find __shared__ or __mockapi__
  scenarioFilePath = path.resolve(rootPath, scenarioFilePath)
  const scenarioFilePathArr: string[] = scenarioFilePath.split(/(\/|\\)/)
  scenarioFilePathArr.pop()
  scenarioFilePathArr.pop()
  scenarioFilePath = scenarioFilePathArr.join('')

  let found = null
  let endFound = false
  if (fs.existsSync(scenarioFilePath)) {
    // Search through directory
    const dir = await fs.promises.opendir(scenarioFilePath)
    for await (const dirent of dir) {
      // Shared find
      if (dirent.name === '__shared__') found = path.resolve(dir.path, dirent.name)
      // End find
      if (dirent.name === '__mockapi__') endFound = true
    }

    // Found, nothing else to do
    if (found) {
      const foundFallbackPath = found.split(/(__mockapi__(\/|\\))/)[3]
      logger.group('cache').yarn.whisper(`fallback path: ${foundFallbackPath}`)
      return foundFallbackPath
    }

    // End, nothing else to do
    if (endFound) return null
  }

  // Search further recursively
  return findScenarioFallbackPath(scenarioFilePath)
}
