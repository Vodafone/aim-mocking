module.exports = {
  rootDir: '../../../',
  bail: false,
  verbose: true,
  collectCoverage: false,
  // testMatch: ['**/src/**/?(*.)+(spec).js?(x)', '**/integrationTests/**/?(*.)+(spec).js?(x)'],
  modulePathIgnorePatterns: ['./tests/__mockapi__'],
  reporters: [
    'default',
    [
      '<rootDir>tools/unit-tests/jest/reporters/json.js',
      {
        output: '<rootDir>coverage/report.json',
      },
    ],
  ],
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: '<rootDir>tools/unitTests/jest/config/framework-config.js',
  transform: {
    '^.+.(js|jsx)$': 'babel-jest',
  },
}
