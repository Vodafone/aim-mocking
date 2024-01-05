import { Request, Response } from 'express'
import logger from '@vodafoneuk/aim-mocking-logger'

import isExcludedPath from './utils/isExcludedPath'

export default function onProxyRequest(proxyReqRes: Response, req: Request) {
  logger.debug('general').yarn.whisper(`incoming request | ${req.url} | session: ${req?.session?.id || null}`)
  // set aim header before excluding the path
  proxyReqRes.setHeader('x-aim-request', 'true')
  // exclude path
  if (isExcludedPath(req.url)) {
    logger.debug('onProxyRequest').yarn.whisper(`incoming request | path excluded | ${req.url}`)
    return
  }
  // add x-aim-request to be able to detect infinitive loop requests
  // this is necessary whenever eg proxying to itself, eg with dalmatian
  if (req.body) {
    const bodyData = JSON.stringify(req.body)
    logger.debug('onProxyRequestDebug').yarn.whisper(`request body: ${bodyData}`)
    // in case if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReqRes.setHeader('Content-Type', 'application/json')
    proxyReqRes.setHeader('Content-Length', Buffer.byteLength(bodyData))
    // stream the content
    proxyReqRes.write(bodyData)
  }
}
