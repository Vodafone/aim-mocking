import { NodeTree } from '../getScenariosList.endpoint.types'

export default function setNonNestedDisabled(data: NodeTree[]): NodeTree[] {
  data.forEach((d: NodeTree) => {
    if (!d.children.length) {
      d.disabled = false
    } else {
      d.disabled = true
      setNonNestedDisabled(d.children)
    }
  })
  return data
}
