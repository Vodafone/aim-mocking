import fs from 'fs'

export default function getTrackerData(trackerFilePath: string) {
  let trackerData = null
  try {
    trackerData = JSON.parse(fs.readFileSync(trackerFilePath, 'utf-8'))
  } catch (err) {
    console.log('parsing tracker data filed. Recreating.')
  }
  if (!trackerData) return { requests: {} }
  if (!trackerData.requests) trackerData.requests = {}
  return trackerData
}
