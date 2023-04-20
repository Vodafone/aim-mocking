import type { Request } from 'express'
import moment from 'moment'

import { MockData } from '@typesDef/mockData.types'

export default function extendCacheData(req: Request, mockData: MockData, { statusCode }: { statusCode?: number } = {}) {
  if (typeof mockData.__cacheMeta === 'undefined') mockData.__cacheMeta = {}
  // Anything to update?
  if (JSON.stringify(mockData.__cacheMeta.hash) === JSON.stringify({ body: req.body, query: req.query })) return
  // Extend by current date
  if (!mockData.__cacheMeta.date) mockData.__cacheMeta.date = moment().format('DD/MM/YYYY HH:mm:ss')
  // Extend by current status
  if (statusCode && !mockData.__cacheMeta.status) mockData.__cacheMeta.status = statusCode
  // Extend with hash
  mockData.__cacheMeta.hash = {
    body: JSON.stringify(req.body),
    query: JSON.stringify(req.query),
  }
  return mockData
}
