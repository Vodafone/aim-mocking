import { Request } from 'express'

import configController from '@modules/configController'

export default function dynamicProxyRouter(req: Request, target: string) {
  // return fake port to enforce calls to fail
  if (configController.getSessionConfig(req, 'mocking')) {
    return 'http://localhost:0000'
  }
  // returns proper call target
  return target
}
