import fs from 'fs'

export default function readLicenseFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8')
}
