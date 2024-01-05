export interface AimProxyConfig {
  target: string
  secure: boolean
  pathRewrite?: (p: string) => string
  changeOrigin: boolean
}
export interface AimConfig {
  /** Debug options */
  debug?: {
    general?: boolean
    setup?: boolean
    cache?: boolean
    cacheDebug?: boolean
    config?: boolean
    autofix?: boolean
    onProxyRequest?: boolean
    onProxyRequestDebug?: boolean
    onProxyError?: boolean
    onProxyResponse?: boolean
    onProxyResponseDebug?: boolean
    configEndpoints?: boolean
    configEndpointsDebug?: boolean
    cacheController?: boolean
    fileInterface?: boolean
    scenarioList?: boolean
  }
  /** List of ignored paths that are already included in "proxy" config. */
  ignoredPaths?: string[]
  /** Aim internal api endpoints prefix  */
  apisConfigurationEndpointsPrefix?: string
  /** Proxy configuration for paths that aim should intercept, mock and record */
  proxy: Record<string, AimProxyConfig>
  /** Request body keys that should be ignored when calculating a hash */
  hashIgnoredReqBodyKeys?: string[]
  /** Request query keys that should be ignored when calculating a hash */
  hashIgnoredReqQueryKeys?: string[]
  /** Request url parts that should be ignored when calculating a hash */
  hashIgnoredReqPathPatterns?: string[]
  /** Function to rewrite request url in order to remove some parts from mock file name */
  rewriteMockPathName?: null | ((str: string) => string)
  /** Storage interface to use, only "file" is supported atm */
  storageInterface?: 'file'
  /** Location where the mocks will be stored. It is recommended to not change this value */
  storageInterfaceRootPath?: string
  enableAutofix?: boolean
}
