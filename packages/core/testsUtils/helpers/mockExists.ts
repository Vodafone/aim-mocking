// @ts-nocheck
import fs from 'fs'
import path from 'path'

import testsConfig from '../config/config'

export default function (scenario, method, file) {
  return fs.existsSync(path.resolve(process.cwd(), testsConfig.rootPath, scenario, method, file))
}
