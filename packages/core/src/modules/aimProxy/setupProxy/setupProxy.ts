import { Application, Request } from 'express'
import logger from '@vodafoneuk/lib-aim-logger'
// @ts-ignore
import proxy from 'http-proxy-middleware'

import configController from '@modules/configController'

import filterSelfRequests from './utils/filterSelfRequests'
import silentLogProvider from './utils/silentLogProvider'

import onProxyRequest from '../onProxyRequest'
import onProxyResponse from '../onProxyResponse'
import onProxyError from '../onProxyError'
import dynamicProxyRouter from '../dynamicProxyRouter'

export function setupProxy(app: Application) {
  logger.debug('setup').yarn.whisper('AIM: setup proxy')
  for (const [proxyKey, proxyConfig] of Object.entries(configController.config.proxy)) {
    logger.debug('setup').yarn.whisper(`AIM: proxy: ${proxyKey} to ${proxyConfig.target}`)
    const apiProxy = proxy(filterSelfRequests, {
      target: proxyConfig.target,
      logLevel: 'silent',
      logProvider: silentLogProvider,
      secure: proxyConfig.secure,
      pathRewrite: proxyConfig.pathRewrite,
      changeOrigin: proxyConfig.changeOrigin,
      onProxyReq: onProxyRequest,
      onProxyRes: onProxyResponse,
      onError: onProxyError,
      router: (req: Request) => {
        return dynamicProxyRouter(req, proxyConfig.target)
      },
    })
    app.use(proxyKey, apiProxy)
  }
}
