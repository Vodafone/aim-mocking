import config from '../config'

export default function appendConsoleFilterPrefix() {
  if (config.consoleLogFiltering.enable) {
    return '@'
  }
  return ''
}
