import path from 'path'

export default function getRootMockPath(pathname: string, rootPath: string): string {
  // Ensure path is relative to the root path
  const relativePath = path.relative(rootPath, pathname)
  // Split path by folders
  let foldersList = relativePath.split(/\//)
  // Remove everything after GET, POST, PUT etc
  let foundRootPath = false
  foldersList = foldersList.filter((value) => {
    if (foundRootPath) return false
    if (value.match(/^(GET|POST|PUT|DELETE)/) !== null) {
      foundRootPath = true
      return false
    }
    return true
  })
  return foldersList.join('/')
}
