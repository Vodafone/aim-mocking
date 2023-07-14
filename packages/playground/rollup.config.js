import esbuild from 'rollup-plugin-esbuild'
import { createRequire } from 'module'
import dts from 'rollup-plugin-dts'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import json from '@rollup/plugin-json'
import html from 'rollup-plugin-generate-html-template'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace'

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

  bundle({
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      resolve({
        jsnext: true,
        preferBuiltins: true,
        browser: true,
        module: true,
        main: true,
        extensions: ['.tsx'],
      }),
      json(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.client.json' }),
      html({
        template: 'src/public/index.html',
        target: 'dist/public/index.html',
      }),
    ],
    input: 'src/public/index.tsx',
    output: {
      dir: 'dist/public',
      format: 'cjs',
    },
  }),
]

export default config
