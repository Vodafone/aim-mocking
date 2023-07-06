// @ts-nocheck
import fs from 'fs'
import path from 'path'
import testsConfig from '../config/config'

export function exists(scenario, method, file) {
  return fs.existsSync(path.resolve(process.cwd(), testsConfig.rootPath, scenario, method.toUpperCase(), file))
}

export function get(scenario, method, file) {
  const fileContent = fs.readFileSync(path.resolve(process.cwd(), testsConfig.rootPath, scenario, method.toUpperCase(), file), 'utf-8')
  return JSON.parse(fileContent)
}
