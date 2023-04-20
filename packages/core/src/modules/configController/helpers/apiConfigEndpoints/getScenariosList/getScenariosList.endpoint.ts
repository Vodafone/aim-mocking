import path from 'path'

import { Request, Response, Application } from 'express'
// @ts-ignore
import { walk } from '@root/walk'

import logger from '@vfuk/lib-aim-logger'

import type configController from '../../../configController'

import getRootMockPath from './utils/getRootMockPath'
import getChildrenTreeFromPaths from './utils/getChildrenTreeFromPaths'
import setNonNestedDisabled from './utils/setNonNestedDisabled'

import { NodeTree } from './getScenariosList.endpoint.types'

export default function getScenariosList(app: Application, context: typeof configController) {
  const method = 'get'
  const endpointUrl = `${context.config.apisConfigurationEndpointsPrefix}/getScenariosList`
  logger.debug('setup').yarn.whisper(`AIM: endpoint: [${method}] "${endpointUrl}"`)
  const storageInterfaceRootPath = path.resolve(process.cwd(), context.config.storageInterfaceRootPath)
  app[method](endpointUrl, async (req: Request, res: Response) => {
    const allMockPaths: string[] = []
    await walk(storageInterfaceRootPath, async (err: unknown, pathname: string) => {
      logger.debug('scenarioList').yarn.whisper(`List path: ${pathname}`)
      if (err) {
        logger.debug('scenarioList').yarn.whisper(`List error: ${err}`)
        throw err
      }
      allMockPaths.push(getRootMockPath(pathname, storageInterfaceRootPath))
      return Promise.resolve()
    })
    let finalTreeList: NodeTree[] = getChildrenTreeFromPaths(allMockPaths)
    finalTreeList = setNonNestedDisabled(finalTreeList)
    logger.debug('scenarioList').yarn.whisper(`List final: ${JSON.stringify(finalTreeList)}`)
    res.send(finalTreeList)
  })
}
