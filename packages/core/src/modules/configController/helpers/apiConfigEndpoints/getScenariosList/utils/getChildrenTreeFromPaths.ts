import { NodeTree } from '../getScenariosList.endpoint.types'

export default function getChildrenTreeFromPaths(paths: string[]): NodeTree[] {
  paths = paths.filter((value) => value)
  const result: NodeTree[] = []
  const level = { result }
  paths.forEach((path) => {
    path.split('/').reduce((r, label, i, path) => {
      // @ts-ignore
      if (!r[label]) {
        // @ts-ignore
        r[label] = { result: [] }
        // @ts-ignore
        r.result.push({ label, value: path.join('/'), tagLabel: path.join('/'), children: r[label].result })
      }
      // @ts-ignore
      return r[label]
    }, level)
  })
  return result
}
