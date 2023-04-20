// @ts-nocheck
import stripAnsi from 'strip-ansi'

export function exists(str) {
  return global.logger.filter((log) => {
    console.log(`LOGS -> ${stripAnsi(log)}`)
    return stripAnsi(log).includes(str)
  }).length
}

export function clear() {
  global.logger = []
}
