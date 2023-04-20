import { Response } from 'express'

export default function sendResponse(res: Response, body: unknown, status: number) {
  if (body === null) {
    return res.status(status).send()
  } else {
    return body
  }
}
