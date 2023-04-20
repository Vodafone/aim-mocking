import { Request } from 'express'

export default function filterSelfRequests(pathname: string, req: Request) {
  return !req.header('x-aim-request')
}
