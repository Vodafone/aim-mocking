import type { Request } from 'express'

export type FilteredRequest = Pick<Request, 'method' | 'path' | 'body' | 'query'>
