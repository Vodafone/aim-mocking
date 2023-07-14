import path from 'path'
import chalk from 'chalk'

import glob from 'glob'

import readJsonFile from './helpers/readJsonFile'
import readLicenseFile from './helpers/readLicenseFile'
import getPackageJsonLicenses from './helpers/getPackageJsonLicenses/getPackageJsonLicenses'
import licenses from './helpers/licenses'

import { ActionParams } from './action.types'

export default function ({ root }: ActionParams) {
  const projectRoot = root ? path.resolve(process.cwd(), root) : process.cwd()
  console.log(chalk.bgYellow(`Running license scan on: ${projectRoot}`))
  const projectPackageJsonPath = path.resolve(projectRoot, 'package.json')
  const projectPackageJsonContent = readJsonFile(projectPackageJsonPath)
  const projectDependencies = projectPackageJsonContent.dependencies

  // Iterate through all dependencies/libraries in given project package.json
  Object.entries(projectDependencies).forEach(([packageName]) => {
    console.log(chalk.yellow(`Scanning for license: ${packageName}`))
    const libBaseRoot = path.resolve('node_modules', packageName)
    const libRootPath = glob.sync(libBaseRoot, {
      cwd: process.cwd(),
    })

    const libPackageJsonPath = path.resolve(process.cwd(), libRootPath[0], 'package.json')
    const libPackageJsonContent = readJsonFile(libPackageJsonPath)
    const libLicenseType = getPackageJsonLicenses(libPackageJsonContent)
    console.log(chalk.gray(`- packageJson: ${libPackageJsonPath}`))
    console.log(chalk.gray(`- packageJson: ${libPackageJsonContent ? 'found' : 'not-found'}`))
    console.log(chalk.gray(`- licenseType: ${libLicenseType}`))

    const libLicenseFiles = glob.sync('**/**/{LICENSE,LICENCE,COPYING}', {
      cwd: libRootPath[0],
      ignore: ['**/node_modules/**'],
    })
    libLicenseFiles.forEach((licenseFile) => {
      const licenseFilePath = path.resolve(libRootPath[0], licenseFile)
      console.log(chalk.gray(`- licenseFile: ${licenseFilePath}`))
      licenses.add(packageName, {
        root: libPackageJsonPath,
        licenseType: libLicenseType,
        licenseContent: readLicenseFile(licenseFilePath),
        packageVersion: libPackageJsonContent.version,
      })
    })

    licenses.save(root)
  })
}
