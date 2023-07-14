/* eslint-disable */
const path = require('path');
const fs = require('fs');

/**
 * Json reporter
 * - save results to file
 */
class JsonReporter {

  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  onRunComplete(contexts, results) {
    fs.writeFile(path.resolve(process.cwd(), this.options.output), JSON.stringify(results));
  }
}

// use module.exports as jest doesn't support es6 fully
module.exports = JsonReporter;
