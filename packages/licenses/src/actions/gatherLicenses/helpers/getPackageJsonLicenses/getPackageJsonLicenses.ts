import { PackageJsonContent } from '../../../../typesDef/packageJson.types'

/**
 * Get licenses from package json
 * @param packageJsonContent
 * @returns
 */
export default function getPackageJsonLicenses(packageJsonContent: PackageJsonContent) {
  // Get array of licenses first and merge, they might contain urls to license which we want to keep
  if (packageJsonContent.licenses) {
    console.log('array of licenses found)')
    return packageJsonContent.licenses.map((license) => `${license.type} ${license.url}`).join(', ')
  }
  // If just one license
  if (packageJsonContent.license) return packageJsonContent.license
  // Handle not found case
  return 'no-license-found'
}
