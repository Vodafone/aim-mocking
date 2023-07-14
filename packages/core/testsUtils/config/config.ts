import path from 'path'

export default {
  // rootPath: './tests/__mockapi__/',
  // cacheOutputDir: './tests/__mockapi__/default',
  rootPath: path.resolve(process.cwd(), './tests/__mockapi__/'),
  cacheOutputDir: path.resolve(process.cwd(), './tests/__mockapi__/default'),
}
