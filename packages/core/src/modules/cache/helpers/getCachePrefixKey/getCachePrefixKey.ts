import type { Request } from 'express'

export default function getCachePrefixKey(req: Request) {
  let prefix = ''
  if (req.header('aim')) prefix = req.header('aim')
  if (req.header('AIM')) prefix = req.header('AIM')
  if (prefix.length) prefix = `${prefix}-`
  return prefix
}
