import fs from 'fs'

export default function ensureTrackerFile(trackerFilePath: string) {
  if (fs.existsSync(trackerFilePath)) return
  fs.writeFileSync(trackerFilePath, JSON.stringify({ requests: {} }), 'utf-8')
}
