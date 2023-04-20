// @ts-nocheck
import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'

import config from '../config/config'

export default function createMock(scenario, method, mockFileName, mockData) {
  const mockPath = path.resolve(config.rootPath, scenario, method)
  mkdirp.sync(mockPath)
  try {
    fs.writeFileSync(path.resolve(mockPath, `${mockFileName}.json`), JSON.stringify(mockData), 'utf-8')
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
