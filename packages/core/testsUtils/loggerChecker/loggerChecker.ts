// @ts-nocheck
import stripAnsi from 'strip-ansi'

export function exists(str) {
  return global.logger.filter((log) => {
    // If you are having troubles with setting up your tests due to terminal colours,
    // You can enable below extra log to get rid of it and be able to copy/paste directly into your tests
    // console.log(`LOGS -> ${stripAnsi(log)}`)
    return stripAnsi(log).includes(str)
  }).length
}

export function clear() {
  global.logger = []
}
