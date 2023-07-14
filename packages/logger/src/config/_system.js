export default {
  // output interfaces
  // array of to be used output interfaces
  // output interface decide how logs will be outputted from logger
  // eg: ['stdout'] will use console log
  // @enum ['stdout', 'writefile', 'testMode']
  outputInterfaces: ['stdout', 'writefile'],

  /**
   * Logfile output path
   */
  logFileOutputPath: '',

  // Define console log line length
  // console logs will always fill full line length
  // ! Setting it too low can be dangerous
  consoleLineLength: 120,

  // clear console on startup
  clearConsole: true,

  // Enforce app start to be shown as first console log
  // It will put all other logs into buffer until appStart is called
  enforceAppStartFirst: false,

  // Features logging
  // log only features specific logs
  // all others will be suspended
  // works with `logger.feature('featureName')....`
  // @default null
  featuresLogging: [],

  // Application logging
  // log only application specific logs
  // all others will be suspended
  // requires setApplicationName() to be specified
  // @default null
  applicationLogging: [],

  // Is stdout filter enabled
  stdoutFilter: {
    // is enabled
    // @default: false
    enabled: true,
    // List of regex to filter out stdout.writes
    // When empty array or null, it will filter ALL stdout not from util-logger
    filterList: [],
  },
}
