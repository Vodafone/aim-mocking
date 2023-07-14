// @ts-nocheck
export default new (class Stdout {
  output(logOutput) {
    if (process.env.LOGGER_MEMORY) {
      if (typeof global.logger === 'undefined') global.logger = []
      global.logger.push(logOutput)
    }
    console.log(logOutput)
  }
})()
