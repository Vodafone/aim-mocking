import fs from 'fs'

export default function saveTrackerData(trackerFilePath: string, data: unknown) {
  fs.writeFileSync(trackerFilePath, JSON.stringify(data, null, 2), 'utf-8')
}
