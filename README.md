<div markdown="1">
  <img width="165px" height="45px" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Vodafone_2017_logo.svg/1280px-Vodafone_2017_logo.svg.png">
</div>

# AIM - Vodafone Mocking Service 

AIM in short is an express based mocking middleware capable of mocking and recording APIs. It is only server-side, so it doesn't modify client side code, which also means that you don't have to bother if what is mocked is different from production or other environment. It should behave in the same way as your production environment.

When you make an API request, normally it would be proxied to your Back End server, and AIM basically sits in between. As long as AIM is disabled, it's not doing anything. Once it's enabled, there are few options to choose from: Mocking and Recording.

In Mocking mode, API requests going to your Back End server will be stopped, and you will receive mocked responses, which have been created or recorded previously. 

In Recording mode, API requests will be allowed as usually, but returned response will be also saved and stored in mock file, to be used for the future mocking.

The main benefit of using aim over other tools is that AIM does not need mapping files or written code to map your request and serve back the mock files - which leads to much lower maintenance cost. (Mapping free tool) It is able to automatically detect which mock to return, depending on the request. 

[update picture for mapping examples]

<img width="1281" alt="image" src="https://user-images.githubusercontent.com/78380665/236480492-e9d08969-f50b-44e7-8df8-ef9c87c25335.png">

[add a better picture of high level design on how AIM works]

<img width="1292" alt="image" src="https://user-images.githubusercontent.com/78380665/236480054-2c95cc8d-52fb-4102-94fb-d44c0be85f27.png">

### Package structure

AIM is a NX monorepo, including 3 packages:
- Core - main package, where AIM "sits
- Logger - custom built package, which provides AIM specific logs in terminal to get clear information about what is being done
- Playground - place where you can test AIM.

### Playground

Run yarn start / tests will run. After start, it will run the scenarios which you can import to your Postman. Has some showcases how AIM works.




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

Configuration - specific to your project, but it's not dynamic. AIM behaviour is controlled through API calls to AIM itself.

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



