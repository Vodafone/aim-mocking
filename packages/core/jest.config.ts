import path from 'path'

import { pathsToModuleNameMapper } from 'ts-jest'

import tsconfig from './tsconfig.json'

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/?(*.)+(spec).js?(x)', '**/tests/**/?(*.)+(spec).ts?(x)'],
  extensionsToTreatAsEsm: ['.ts'],
  watchPathIgnorePatterns: ['./tests/__mockapi__', './=tests'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig?.compilerOptions?.paths, {
      prefix: '<rootDir>/',
      useESM: true,
    }),
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: path.resolve(__dirname, './=tests'),
        filename: 'index.html',
        expand: true,
      },
    ],
  ],
  transform: {
    '^.+\\.ts?$': ['ts-jest', {}],
  },
}
