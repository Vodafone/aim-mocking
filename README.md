<div markdown="1">
  <img width="165px" height="45px" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Vodafone_2017_logo.svg/1280px-Vodafone_2017_logo.svg.png">
</div>

# AIM - Vodafone Mocking Service 

AIM in short is an express based mocking middleware capable of mocking and recording APIs.

The main benefit of using aim over other tools is that AIM does not need mapping files or written code to map your request and serve back the mock files - which leads to much lower maintenance cost.

[to be added]

## Contents

- [Getting started]()
  - [Requirements]()
  - [Installation]()
  - [Quick start]()
- [Video tutorials??]()
- [Examples]()
- [Contributing]()
- [People]()
- [License]()
- [to be added]

## Getting started

If you prefer a code example visit the playground app here:
- `./packages/playground`
- or as a link here: [Playground code](https://dev.azure.com/vfuk-digital/Digital/_git/lib-web-aim?path=/packages/playground) [to be updated]


### Requirements

- Node version >18.13.0
- Both packages installed: `@vfuk/lib-web-aim` and `@vfuk/lib-aim-logger`

[to be updated]

### Installation

With npm:

```
npm install @vfuk/lib-web-aim @vfuk/lib-aim-logger
```

With yarn:
```
yarn add @vfuk/lib-web-aim @vfuk/lib-aim-logger
```

[to be added]

### Quick Start

Implement into express app

```
import Aim from '@vfuk/lib-web-aim'

import express from 'express'

const app = express()

Aim(app, yourConfig)
```

Configuration

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

[to be added]


## Examples

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

[to be added]

------

## Video tutorials??

[to be added]

------

## Contributing

[to be added]

------

## People

Author: [add name]

Current lead maintainer: [Radek Swiat](https://github.com/radswiat)

See all contributors [here]() [to be added]

------

## License

[MIT License](https://github.com/Vodafone/aim-mocking/blob/main/LICENSE)



