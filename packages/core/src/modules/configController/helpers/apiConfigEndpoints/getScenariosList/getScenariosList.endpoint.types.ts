export interface NodeTree {
  label: string
  tagLabel: string
  value: string
  disabled?: boolean
  children: NodeTree[]
}
