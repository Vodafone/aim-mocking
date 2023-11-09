<img width="165" height="45" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Vodafone_2017_logo.svg/1280px-Vodafone_2017_logo.svg.png" alt="Vodafone">

# AIM - Vodafone Mocking Service

AIM is a mocking middleware that is based on Express and can mock and record APIs. It operates only on the server-side and does not modify the client-side code. Therefore, you don't need to worry if the mocks are different from the production or other environments, as AIM behaves in the same way as your production environment.

The main advantage of using AIM over other tools is that it does not require mapping files or written code to map your request and serve back the mock files. This leads to lower maintenance costs. AIM can automatically detect which mock to return based on the request.

<img width="1281" alt="A diagram showing AIM mocking" src="https://user-images.githubusercontent.com/78380665/236480492-e9d08969-f50b-44e7-8df8-ef9c87c25335.png">

---

## Contents

- [AIM - Vodafone Mocking Service](#aim---vodafone-mocking-service)
  - [Contents](#contents)
  - [How AIM works](#how-aim-works)
    - [Some of the most important features of AIM:](#some-of-the-most-important-features-of-aim)
    - [Package structure](#package-structure)
    - [Playground](#playground)
  - [Getting started](#getting-started)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Quick Start](#quick-start)
  - [Examples](#examples)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [Releases](#releases)
  - [People](#people)
  - [License](#license)

---

## How AIM works

When you make an API request, it is normally proxied to your back-end server. AIM essentially sits in between. As long as it is disabled, it is not doing anything. Once it is enabled, you have a few options to choose from:

1. **Disabled mode**: The application will continue working as usual without AIM.
2. **Recording mode**: API requests are allowed as usual, but the returned responses will also be saved and stored in mock files for future mocking.
3. **Mocking mode**: API requests going to your back-end server will be stopped, and mocked responses that have been created or recorded previously will be received.

**_AIM does not allow using both modes simultaneously to avoid confusion about which data is real and which is mocked._**

If Mocking mode is enabled, and mocks do not exist, AIM will provide guidelines on how to fix the problem and which files to create, and/or create mocks manually.

<!-- [add a better picture of high level design on how AIM works] -->

<img width="1292" alt="A diagram showing the how AIM works at a high level" src="https://user-images.githubusercontent.com/78380665/236480054-2c95cc8d-52fb-4102-94fb-d44c0be85f27.png">

AIM is a unique type of middleware because it requires passing the application to it in order to maintain good control over it. If implemented differently, the setup process would be much more complex since AIM needs to proxy requests.

Currently, AIM is only capable of mocking **_JSON responses_**. The default response status for mocks is always 200, but it can be changed as needed.

### Some of the most important features of AIM:

1. `session`: allows multiple people to work on mock files with different data. AIM recognises who you are based on the session of first connect and returns the same in-memory session later on.
2. `ConfigController`: provides dynamic configuration inside AIM.
   - All configurations come from it.
   - Different configurations are available for different users (session support).
   - Handles configuration endpoints (health, mocking, recording, etc.) that can be modified by APIs.
3. `Cache` = mocks: AIM supports only the cache interface.
4. [HPM] `proxy` / `setupProxy`: `onProxyRequest` and `onProxyResponse` are the functions where AIM actually sits and can manipulate requests, responses, and data.
5. `cacheController`: helps to return correct mocks.

All mock responses can be recognised via the `__cacheMeta` object added to the response. Some of its properties can be modified to provide a better and more realistic mocking experience.

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

<img width="884" alt="A diagram showing examples of different mocking scenarios" src="https://github.com/Vodafone/aim-mocking/assets/78380665/57cd6954-720c-4dbe-a63d-5bdcf717ee1b">

### Package structure

AIM is a NX monorepo that includes three packages:

- Core: the main package where AIM "sits"
- Logger: a custom-built package that provides AIM-specific logs in the terminal, giving clear information about what is being done
- Playground: a place where you can test AIM.

### Playground

Running `yarn start:playground` will execute tests and scenarios that showcase how AIM works. You can also import these scenarios into your Postman.

You can import `AIM.postman_collection.json` in Postman while running the playground to experiment with AIM API via Postman.

---

## Getting started

### Requirements

- Node version >18.13.0
- Both packages installed: `@vodafoneuk/aim-mocking` and `@vodafoneuk/aim-mocking-logger`

### Installation

With npm:

```
npm install @vodafoneuk/aim-mocking @vodafoneuk/aim-mocking-logger
```

With yarn:

```
yarn add @vodafoneuk/aim-mocking @vodafoneuk/aim-mocking-logger
```

### Quick Start

Implement into express app

```
import Aim from '@vodafoneuk/aim-mocking'

import express from 'express'

const app = express()

Aim(app, yourConfig)
```

Configuration is specific to your project. It is important to remember that it is not dynamic; AIM behaviour is controlled through API calls to AIM itself.

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

  /** Proxy configuration for paths that AIM should intercept, mock and record */
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

## Examples

Below are not default values! If you are unsure of what each option does, please do not copy it.

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
        // Ask AIM to proxy back to your own server
        // This is useful if you want to use your own proxy instead of AIM
        // which will be removed in production code
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  })
```

---

## Testing
Running `yarn nx test @vodafoneuk/aim-mocking` should run all tests for aim core
Playground has some tests too, but most important ones are in the core package.

To write a new test go into packages/core/tests and modify .spec.ts files or create a new one.

---

## Contributing

- Fork the repository.
- Make your changes.
- Send a pull request, ensuring that the application still runs and tests are passing.
- A member of our team will review and discuss your changes.

---

## Releases

- Create a PR.
- Make your changes.
- Manually prepare the release and release notes.
- Bump versions of the modified packages.
- Send a pull request, ensuring that the application still runs and tests are passing.
- Once merged, new release will be created automatically through `publish` action.

---

## People

Author: Vodafone UK

Current lead maintainer: [Radek Swiat](https://github.com/radswiat)

See all contributors [here](https://github.com/Vodafone/aim-mocking/graphs/contributors)

---

## License

[MIT License](https://github.com/Vodafone/aim-mocking/blob/main/LICENSE)
