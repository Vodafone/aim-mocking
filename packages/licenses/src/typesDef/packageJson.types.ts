export type PackageJsonLicenses = {
  type: string
  url: string
}

export type PackageJsonContent = {
  license: string
  licenses: PackageJsonLicenses[]
  dependencies: Record<string, string>
}
