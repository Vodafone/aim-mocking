import path from 'path'

import configController from '@modules/configController'

export default function getMocksRootDir() {
  return path.resolve(process.cwd(), configController.config.storageInterfaceRootPath)
}
