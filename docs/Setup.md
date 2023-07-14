[[_TOC_]]

# Setup
----

If you prefer a code example visit the playground app here:
- `./packages/playground`
- or as a link here: [Playground code](https://github.com/Vodafone/aim-mocking/blob/main/packages/playground/src/server.ts)

## Yarn install
------

Make sure to install 2 packages. Aim and the logger.

Logger is a custom logger built for AIM and it was split from the core in case of future removal/replacements.

```
yarn add @vodafoneuk/lib-web-aim @vodafoneuk/lib-aim-logger
```

## Implement into express app
------

```
import Aim from '@vodafoneuk/lib-web-aim'

import express from 'express'

const app = express()

Aim(app, yourConfig)
```

## Configuration
------

```
export interface AimConfig {
  /** Debug options */
  debug?: {
    setup?: boolean
    cache?: boolean
    config?: boolean
    autofix?: boolean
    onProxyRequest?: boolean
    onProxyError?: boolean
    onProxyResponse?: boolean
    configEndpoints?: boolean
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
```

## Example initialization

Below are not default values! If you don't know what each option do, please do not copy it.

```

  AimMiddleware(app, {
    ignoredPaths: [],
    hashIgnoredReqBodyKeys: ['customerId', 'time'],
    hashIgnoredReqQueryKeys: ['perpage'],
    hashIgnoredReqPathPatterns: [],
    rewriteMockPathName: (requestPath: string) => {
      return requestPath.replace(/api\//, '')
    },
    proxy: {
      '/api': {
        // Ask aim to proxy back to your own server
        // This is useful if you want to use your own proxy instead of AIM
        // which will be removed in production code
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  })

```
