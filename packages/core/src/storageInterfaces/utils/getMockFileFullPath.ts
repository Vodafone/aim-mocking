import path from 'path'

export default function getMocksRootDir(rootPath: string, relativeMockPath: string) {
  return path.resolve(rootPath, `${relativeMockPath}.json`)
}
