import findFallbackPath from './utils/findFallbackPath'

export default async function getCacheStorageFallbackKey(filePath: string, scenarioFilePath: string): Promise<string> {
  const fallbackPath = await findFallbackPath(scenarioFilePath)
  if (fallbackPath) return `${fallbackPath}/${filePath}`
  return null
}
