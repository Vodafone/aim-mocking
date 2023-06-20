import esbuild from 'rollup-plugin-esbuild'
import { createRequire } from 'module'
import dts from 'rollup-plugin-dts'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import json from '@rollup/plugin-json'

const require = createRequire(import.meta.url)
const pkgjson = require('./package.json')
const external = [...Object.keys(pkgjson.dependencies || {}), ...Object.keys(pkgjson.peerDependencies || {})].map((name) => RegExp(`^${name}($|/)`))

const bundle = (config) => {
  return {
    ...config,
    input: config.input,
    external,
  }
}

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  bundle({
    plugins: [json(), tsConfigPaths(), esbuild({ platform: 'node', treeShaking: true, color: true })],
    input: pkgjson.source,
    output: [
      {
        format: 'es',
        file: pkgjson.exports['.'].import,
      },
      {
        format: 'cjs',
        file: pkgjson.exports['.'].require,
      },
    ],
  }),

  bundle({
    plugins: [json(), tsConfigPaths(), dts()],
    input: pkgjson.source,
    output: [
      {
        file: pkgjson.types,
        format: 'es',
      },
    ],
  }),
]

export default config
