import path from 'path'
import fs from 'fs'

import { License } from './licenses.types'

export class Licenses {
  licenses: Record<string, License> = {}

  /**
   * Add package license data
   * @param packageName
   * @param data
   */
  add(packageName: string, data: License) {
    if (typeof this.licenses[packageName] === 'undefined') this.licenses[packageName] = { packageName }
    Object.assign(this.licenses[packageName], data)
  }

  // Save licenses to the file
  save(rootPath: string) {
    let data = ''
    // Print package + license
    Object.values(this.licenses).forEach((license) => {
      data += `-------------------------------- \n`
      data += `Package: ${license.packageName} \n`
      data += `Package version: ${license.packageVersion} \n`
      data += `License: ${license.licenseType} \n`
    })
    data += `\n\n\n`
    // Print full license contents
    Object.values(this.licenses).forEach((license) => {
      data += `\n\n\n`
      data += `-------------------------------- \n`
      data += `Package: ${license.packageName} \n`
      data += `Package version: ${license.packageVersion} \n`
      data += `License: ${license.licenseType} \n`
      data += `${license.licenseContent} \n`
    })
    fs.writeFileSync(path.resolve(rootPath, 'NOTICE'), data)
  }
}

export default new Licenses()
