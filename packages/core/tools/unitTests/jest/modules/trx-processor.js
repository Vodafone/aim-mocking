var builder = require('jest-trx-results-processor');
const mkdirp = require('mkdirp');

mkdirp('.testresults');

module.exports = builder({
  outputFile: '.testresults/test-results.trx', // this defaults to "test-results.trx"
});
