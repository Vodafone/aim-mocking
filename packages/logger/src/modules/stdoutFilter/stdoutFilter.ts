// @ts-nocheck
import { EOL } from 'os'

export class StdoutFilter {
  // Buffer filter
  // all filtered out logs are stored
  // to allow to be flushed at any time
  static bufferFilter = []

  // stdoutWrite
  // this will hold original stdout.write function
  static stdoutWrite = null

  // Is filter disabled
  // filter can be disabled locally
  // this will be 'true' when buffer flush is initialized
  static isFilterDisabled = false

  /**
   * Use stdoutFiler
   * This will enable stdout filter
   * @param {Object} config
   */
  use(config) {
    this.config = config
    this._overrideStdoutWrite()
    this._bindProcessExitFlush()
  }

  /**
   * Handle process exit flush
   * On any process exit we have to ensure all logs
   * has been printed from the buffer, as this can cause issues
   * with errors not showing on app crash
   */
  _bindProcessExitFlush() {
    process.on('exit', this._enforceBufferFlushExit)
    process.on('SIGINT', this._enforceBufferFlushExit)
    process.on('SIGUSR1', this._enforceBufferFlushExit)
    process.on('SIGUSR2', this._enforceBufferFlushExit)
    process.on('uncaughtExceptionMonitor', this._enforceBufferFlushExit)
  }

  /**
   * Enforce buffer flush
   * Print all buffer into the console and exit
   */
  _enforceBufferFlushExit = () => {
    StdoutFilter.isFlushMode = true
    // print all buffer
    StdoutFilter.bufferFilter.forEach((buffer) => {
      console.log(buffer.replace(EOL, ''))
    })
    // clear buffer
    StdoutFilter.bufferFilter = []
    // exit, as this is always called from exit flush
    process.exit()
  }

  /**
   * Override stdout write
   * - replace original stdout.write function
   * - allow to intercept stdout.write to filter and buffer
   */
  _overrideStdoutWrite() {
    /* eslint-disable */
    const self = this
    StdoutFilter.stdoutWrite = process.stdout.write
    process.stdout.write = function write(string, encoding, fd) {
      if (!string.length) return
      if (!StdoutFilter.isFlushMode) {
        const filter = self.config.filterList.find((matcher) => {
          return string.match(matcher)
        })
        if (filter) {
          StdoutFilter.bufferFilter.push(string)
          return
        }
      }
      StdoutFilter.stdoutWrite.apply(process.stdout, arguments)
    }
    /* eslint-enable */
  }
}

export default new StdoutFilter()
