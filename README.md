<img width="165px" height="45px" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Vodafone_2017_logo.svg/1280px-Vodafone_2017_logo.svg.png">

# AIM - Vodafone Mocking Service 

AIM in short is an express based mocking middleware capable of mocking and recording APIs. It is only server-side, so it doesn't modify client side code, so you don't have to bother if mocks are different from production or other environment - it should behave in the same way as your production environment.

The main benefit of using AIM over other tools is that it does not need mapping files or written code to map your request and serve back the mock files, which leads to much lower maintenance cost. It is able to automatically detect which mock to return, depending on the request. 

[update picture for mapping examples]

<img width="1281" alt="image" src="https://user-images.githubusercontent.com/78380665/236480492-e9d08969-f50b-44e7-8df8-ef9c87c25335.png">

[to be added]

------

## Contents

- [How AIM works](#how-aim-works)
  - [Package structure](#package-structure)
  - [Playground](#playground)
- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Quick start](#quick-start)
- [Video tutorials??]()
- [Examples](#examples)
- [Contributing](#contributing)
- [People](#people)
- [License](#license)
- [to be added]

------

## How AIM works

When you make an API request, normally it would be proxied to your Back End server. AIM basically sits in between. As long as it is disabled, it's not doing anything. Once it's enabled, there are few options to choose from:
1. **Disabled mode**: application will continue working as usually without AIM.
2. **Recording mode**: API requests are allowed as usually, but returned responses will be also saved and stored in mock files, to be used for the future mocking.
3. **Mocking mode**: API requests going to your Back End server are stopped, and mocked responses, which have been created or recorded previously, will be received. 

***AIM doesn't allow using both modes at the same time to avoid confusion about which data is real and which is mocked.***

In case of Mocking mode, if mocks don't exist, AIM will provide guidelines on fixing the problem and which files to create, and/or create mocks manually.

[add a better picture of high level design on how AIM works]

<img width="1292" alt="image" src="https://user-images.githubusercontent.com/78380665/236480054-2c95cc8d-52fb-4102-94fb-d44c0be85f27.png">

AIM is a different way of middleware, because you are passing application to it, as it has to have a good control over it. If it would have been done in another way, setup would be much more complex, because AIM needs to proxy the requests. 

At the moment, AIM is able to mock ***only JSON responses***. Default response status for mocks is always 200, but it can be changed when needed.

#### Some of most important features of AIM:

1. `session`: allows multiple people to work on mock files with different data. AIM is recognizing who you are, based on the session of first connect, and it gives back same in-memory session later one.
2. `ConfigController`: dynamic configuration inside AIM.
    - all configs come from it
    - different configs for different users (session support)
    - handles configuration endpoints (health, mocking, recording etc.) - the one which can be modified by APIs.
3. `Cache` = mocks: AIM supports only cache interface.
4. [HPM] `proxy` / `setupProxy`: `onProxyRequest` and `onProxyResponse` - are the functions where AIM actually sits and is able to manipulate requests/responses and data.
5. `cacheController`: helps to return correct mocks.

All mock responses can be recognised via `__cacheMeta` object added to response. Some of it's properties can be modified to provide better and more realisting mocking experience.

```
"__cacheMeta": {    // used for visualising body and query parameters for debugging purpose, main ingredients for the hash
  "status": 400,    // can be modified
  "delay": 5000,    // property in mocks to delay response time
  "hash": {
    "body": {},
    "query": {}
  }
}
```

Mocking different scenarios [add a better picture]
<img width="884" alt="image" src="https://github.com/Vodafone/aim-mocking/assets/78380665/57cd6954-720c-4dbe-a63d-5bdcf717ee1b">


### Package structure

AIM is a NX monorepo, including 3 packages:
- Core - main package, where AIM "sits"
- Logger - custom built package, which provides AIM specific logs in terminal to get clear information about what is being done
- Playground - place where you can test AIM.

### Playground

Run `yarn start` will run the tests and the scenarios which you can import to your Postman. Has some showcases how AIM works.

------

## Getting started

If you prefer a code example visit the playground app here:
- `./packages/playground`
- or as a link here: [Playground code](https://dev.azure.com/vfuk-digital/Digital/_git/lib-web-aim?path=/packages/playground) [to be updated]


### Requirements

- Node version >18.13.0
- Both packages installed: `@vfuk/lib-web-aim` and `@vfuk/lib-aim-logger`


### Installation

With npm:

```
npm install @vfuk/lib-web-aim @vfuk/lib-aim-logger
```

With yarn:
```
yarn add @vfuk/lib-web-aim @vfuk/lib-aim-logger
```


### Quick Start

Implement into express app

```
import Aim from '@vfuk/lib-web-aim'

import express from 'express'

const app = express()

Aim(app, yourConfig)
```

Configuration - specific to your project. It's important to remember that it's not dynamic: AIM behaviour is controlled through API calls to AIM itself.

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



