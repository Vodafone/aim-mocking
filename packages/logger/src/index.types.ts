/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// declare module '@vfuk/util-aim-logger' {

interface Group {
  yarn: Yarn
  console: Console
  flush: () => void
}

interface Yarn {
  appStart(logoFn: Function, version?: string): void
  status(title: string, description: string, status: boolean | 0 | null): void
  info(title: string, value: string): void
  section(title: string, description: string): void
  divider(): void
  whisper(title: string): void
  failure(message: string, ...params: any[]): void
  success(message: string, ...params: any[]): void
}

interface Console {
  log(...params: any[]): void
  info(...params: any[]): void
  warn(...params: any[]): void
  error(...params: any[]): void
  debug(...params: any[]): void
}

export interface Logger {
  console: Console
  yarn: Yarn
  group: (groupName: string) => Group
  debug: Function
}
