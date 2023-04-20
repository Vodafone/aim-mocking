// @ts-nocheck
import fs from 'fs'
import path from 'path'

import testsConfig from '../config/config'

export default function (scenario, method, file) {
  const fileContent = fs.readFileSync(path.resolve(process.cwd(), testsConfig.rootPath, scenario, method, file), 'utf-8')
  return JSON.parse(fileContent)
}
