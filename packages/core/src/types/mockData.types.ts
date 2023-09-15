export interface MockData {
  __cacheMeta: {
    date?: string
    delay?: number
    status?: number
    sessionId?: string
    headers?: Record<string, string>
    mode?: string
    filePath?: string
    hash?: {
      body?: string
      query?: string
    }
  }
}
